import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  appointments, type Appointment, type InsertAppointment,
  timeSlots, type TimeSlot, type InsertTimeSlot,
  testimonials, type Testimonial, type InsertTestimonial
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Appointments
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  confirmAppointment(id: number): Promise<Appointment | undefined>;
  
  // Time Slots
  getTimeSlots(date: string): Promise<TimeSlot[]>;
  getAvailableTimeSlots(date: string): Promise<TimeSlot[]>;
  createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot>;
  markTimeSlotAsBooked(date: string, time: string): Promise<boolean>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private appointments: Map<number, Appointment>;
  private timeSlots: Map<number, TimeSlot>;
  private testimonials: Map<number, Testimonial>;
  
  // Counters for IDs
  private userIdCounter: number;
  private serviceIdCounter: number;
  private appointmentIdCounter: number;
  private timeSlotIdCounter: number;
  private testimonialIdCounter: number;
  
  constructor() {
    // Initialize maps
    this.users = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.timeSlots = new Map();
    this.testimonials = new Map();
    
    // Initialize counters
    this.userIdCounter = 1;
    this.serviceIdCounter = 1;
    this.appointmentIdCounter = 1;
    this.timeSlotIdCounter = 1;
    this.testimonialIdCounter = 1;
    
    // Seed initial data
    this.seedServices();
    this.seedTimeSlots();
    this.seedTestimonials();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceIdCounter++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }
  
  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentIdCounter++;
    const newAppointment: Appointment = { 
      ...appointment, 
      id, 
      confirmed: false,
      createdAt: new Date(),
      message: appointment.message || null,
      insuranceProvider: appointment.insuranceProvider || null,
      bookingForSomeoneElse: appointment.bookingForSomeoneElse || null
    };
    this.appointments.set(id, newAppointment);
    
    // Mark the time slot as booked
    await this.markTimeSlotAsBooked(appointment.appointmentDate, appointment.appointmentTime);
    
    return newAppointment;
  }
  
  async confirmAppointment(id: number): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (appointment) {
      const updatedAppointment = { ...appointment, confirmed: true };
      this.appointments.set(id, updatedAppointment);
      return updatedAppointment;
    }
    return undefined;
  }
  
  // Time Slot methods
  async getTimeSlots(date: string): Promise<TimeSlot[]> {
    return Array.from(this.timeSlots.values()).filter(
      (slot) => slot.date === date
    );
  }
  
  async getAvailableTimeSlots(date: string): Promise<TimeSlot[]> {
    // First check if we already have slots for this date
    const existingSlots = Array.from(this.timeSlots.values()).filter(
      (slot) => slot.date === date && slot.available
    );
    
    // If we have slots, return them
    if (existingSlots.length > 0) {
      return existingSlots;
    }
    
    // If no slots exist for this date, generate them on demand
    // (only for non-weekend days)
    const requestedDate = new Date(date);
    const dayOfWeek = requestedDate.getDay();
    
    // Skip slot generation for weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return [];
    }
    
    // Generate time slots from 8:00 AM to 5:30 PM with 30-minute intervals
    const newSlots: TimeSlot[] = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip lunch hour (1:00 PM to 2:00 PM)
        if (hour === 13) continue;
        
        const hourDisplay = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour < 12 ? "AM" : "PM";
        const minuteDisplay = minute === 0 ? "00" : minute;
        const time = `${hourDisplay}:${minuteDisplay} ${amPm}`;
        
        const newSlot = await this.createTimeSlot({
          date,
          time,
          available: true
        });
        
        newSlots.push(newSlot);
      }
    }
    
    return newSlots;
  }
  
  async createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const id = this.timeSlotIdCounter++;
    const newTimeSlot: TimeSlot = { 
      ...timeSlot, 
      id, 
      available: timeSlot.available === undefined ? true : timeSlot.available 
    };
    this.timeSlots.set(id, newTimeSlot);
    return newTimeSlot;
  }
  
  async markTimeSlotAsBooked(date: string, time: string): Promise<boolean> {
    const timeSlot = Array.from(this.timeSlots.values()).find(
      (slot) => slot.date === date && slot.time === time && slot.available
    );
    
    if (timeSlot) {
      const updatedTimeSlot: TimeSlot = { ...timeSlot, available: false };
      this.timeSlots.set(timeSlot.id, updatedTimeSlot);
      return true;
    }
    
    return false;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Seed methods for initial data
  private seedServices() {
    const initialServices: InsertService[] = [
      {
        name: "Teeth Whitening",
        description: "Professional teeth whitening treatments to remove stains and discoloration, giving you a brighter, more confident smile.",
        icon: "teeth",
      },
      {
        name: "Cosmetic Dentistry",
        description: "Enhance your smile with our range of cosmetic procedures including veneers, bonding, and smile makeovers.",
        icon: "tooth",
      },
      {
        name: "Dental Implants",
        description: "Replace missing teeth with dental implants that look, feel, and function just like your natural teeth.",
        icon: "teeth-open",
      },
      {
        name: "Regular Cleanings",
        description: "Maintain your oral health with regular professional cleanings and comprehensive dental examinations.",
        icon: "clipboard-check",
      },
      {
        name: "Invisalign",
        description: "Straighten your teeth discreetly with Invisalign clear aligners, the modern alternative to traditional braces.",
        icon: "align-left",
      },
      {
        name: "Emergency Care",
        description: "Quick relief for dental emergencies including toothaches, broken teeth, and other urgent dental issues.",
        icon: "first-aid",
      },
      {
        name: "Botox",
        description: "Botox treatments for both cosmetic and therapeutic purposes including TMJ treatment and facial rejuvenation.",
        icon: "magic-wand-sparkles",
      },
      {
        name: "Dental Implant Consult",
        description: "Visiting a dentist to replace broken or missing teeth. Following the exam, the dentist will offer recommendations for care, provide the opportunity to discuss treatment, finances and address any questions.",
        icon: "teeth-open",
      },
      {
        name: "Invisalign Consult",
        description: "Meet with our specialists to discuss if Invisalign is right for you. Get all your questions answered and learn about the process.",
        icon: "align-left",
      },
      {
        name: "New Patient Cleaning & Exam (14 & under)",
        description: "Comprehensive dental examination and cleaning for new patients ages 14 and under.",
        icon: "clipboard-check",
      },
      {
        name: "New Patient Cleaning & Exam - Adult",
        description: "Comprehensive dental examination and cleaning for new adult patients.",
        icon: "clipboard-check",
      },
      {
        name: "New Patient Emergency/Tooth Pain",
        description: "Urgent care for new patients experiencing dental emergencies or tooth pain.",
        icon: "first-aid",
      }
    ];
    
    initialServices.forEach(service => {
      this.createService(service);
    });
  }
  
  private seedTimeSlots() {
    // Create available time slots for the next 30 days
    const today = new Date();
    
    // Generate time slots from 8:00 AM to 5:30 PM with 30-minute intervals
    const times: string[] = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip lunch hour (1:00 PM to 2:00 PM)
        if (hour === 13) continue;
        
        const hourDisplay = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour < 12 ? "AM" : "PM";
        const minuteDisplay = minute === 0 ? "00" : minute;
        times.push(`${hourDisplay}:${minuteDisplay} ${amPm}`);
      }
    }
    
    // Generate slots for today and the next 60 days
    for (let i = 0; i <= 60; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
        continue;
      }
      
      const dateStr = futureDate.toISOString().split('T')[0];
      
      times.forEach(time => {
        this.createTimeSlot({
          date: dateStr,
          time: time,
          available: true
        });
      });
    }
    
    // Additionally add time slots for specific dates in the UI mockups
    const mockupDates = ["2025-04-01", "2025-04-02", "2025-04-03"];
    mockupDates.forEach(mockupDate => {
      times.forEach(time => {
        this.createTimeSlot({
          date: mockupDate,
          time: time,
          available: true
        });
      });
    });
  }
  
  private seedTestimonials() {
    const initialTestimonials: InsertTestimonial[] = [
      {
        name: "Jane M.",
        content: "I've been going to Nextcare Dental Studio for years. The staff is incredibly friendly and the care is top-notch. I would recommend them to anyone looking for quality dental care!",
        rating: 5,
        patientSince: "2018"
      },
      {
        name: "Robert T.",
        content: "I was terrified of dental work until I found Nextcare Dental Studio. Their gentle approach and concern for patient comfort has completely changed my perspective. Now I actually look forward to my appointments!",
        rating: 5,
        patientSince: "2020"
      },
      {
        name: "Sarah C.",
        content: "My Invisalign treatment has been life-changing! The team at Nextcare Dental Studio was professional, supportive, and the results exceeded my expectations. I can't stop smiling now!",
        rating: 5,
        patientSince: "2021"
      }
    ];
    
    initialTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

// Create and export a singleton instance
export const storage = new MemStorage();
