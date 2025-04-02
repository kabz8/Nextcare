import { eq, and, desc } from "drizzle-orm";
import { IStorage } from "./storage";
import { db } from "./db";
import {
  services,
  appointments,
  timeSlots,
  users,
  testimonials,
  products,
  type Service,
  type InsertService,
  type Appointment,
  type InsertAppointment,
  type TimeSlot,
  type InsertTimeSlot,
  type User,
  type InsertUser,
  type Testimonial,
  type InsertTestimonial,
  type Product,
  type InsertProduct
} from "@shared/schema";

export class DbStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments).orderBy(desc(appointments.createdAt));
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    const result = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
    return result[0];
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const result = await db.insert(appointments).values({
      ...appointment,
      message: appointment.message || null,
      insuranceProvider: appointment.insuranceProvider || null,
      bookingForSomeoneElse: appointment.bookingForSomeoneElse || false
    }).returning();
    
    // Mark the time slot as booked
    await this.markTimeSlotAsBooked(appointment.appointmentDate, appointment.appointmentTime);
    
    return result[0];
  }

  async confirmAppointment(id: number): Promise<Appointment | undefined> {
    const result = await db
      .update(appointments)
      .set({ confirmed: true })
      .where(eq(appointments.id, id))
      .returning();
      
    return result[0];
  }

  // Time Slots
  async getTimeSlots(date: string): Promise<TimeSlot[]> {
    return await db.select().from(timeSlots).where(eq(timeSlots.date, date));
  }

  async getAvailableTimeSlots(date: string): Promise<TimeSlot[]> {
    console.log(`Getting available time slots for date: ${date}`);
    
    // First check if we already have slots for this date
    const existingSlots = await db
      .select()
      .from(timeSlots)
      .where(and(eq(timeSlots.date, date), eq(timeSlots.available, true)));
    
    // If we have slots, return them
    if (existingSlots.length > 0) {
      console.log(`Found ${existingSlots.length} existing time slots for date ${date}`);
      return existingSlots;
    }
    
    console.log(`No existing slots found for ${date}, generating new slots...`);
    
    // If no slots exist for this date, generate them on demand
    // (only for non-weekend days)
    const requestedDate = new Date(date);
    const dayOfWeek = requestedDate.getDay();
    
    // Skip slot generation for weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      console.log(`${date} is a weekend, not generating slots`);
      return [];
    }
    
    // Generate time slots from 9:00 AM to 5:30 PM with 30-minute intervals
    const newSlots: TimeSlot[] = [];
    for (let hour = 9; hour <= 17; hour++) {
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
    
    console.log(`Generated ${newSlots.length} new time slots for date ${date}`);
    return newSlots;
  }

  async createTimeSlot(timeSlot: InsertTimeSlot): Promise<TimeSlot> {
    const result = await db.insert(timeSlots).values({
      ...timeSlot,
      available: timeSlot.available === undefined ? true : timeSlot.available
    }).returning();
    
    return result[0];
  }

  async markTimeSlotAsBooked(date: string, time: string): Promise<boolean> {
    const existingSlot = await db
      .select()
      .from(timeSlots)
      .where(
        and(
          eq(timeSlots.date, date),
          eq(timeSlots.time, time),
          eq(timeSlots.available, true)
        )
      )
      .limit(1);
    
    if (existingSlot.length > 0) {
      await db
        .update(timeSlots)
        .set({ available: false })
        .where(eq(timeSlots.id, existingSlot[0].id));
      
      return true;
    }
    
    return false;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }
  
  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values({
      ...product,
      featured: product.featured || false
    }).returning();
    return result[0];
  }

  // Seed methods
  async seedDatabase(): Promise<void> {
    await this.seedServices();
    await this.seedTestimonials();
    await this.seedTimeSlots();
    await this.seedProducts();
  }

  private async seedServices(): Promise<void> {
    const existingServices = await db.select().from(services);
    
    // Only seed if there are no services yet
    if (existingServices.length > 0) {
      console.log("Services already seeded, skipping...");
      return;
    }
    
    console.log("Seeding services...");
    
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
    
    for (const service of initialServices) {
      await this.createService(service);
    }
    
    console.log(`Seeded ${initialServices.length} services successfully`);
  }

  private async seedTestimonials(): Promise<void> {
    const existingTestimonials = await db.select().from(testimonials);
    
    // Only seed if there are no testimonials yet
    if (existingTestimonials.length > 0) {
      console.log("Testimonials already seeded, skipping...");
      return;
    }
    
    console.log("Seeding testimonials...");
    
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
    
    for (const testimonial of initialTestimonials) {
      await this.createTestimonial(testimonial);
    }
    
    console.log(`Seeded ${initialTestimonials.length} testimonials successfully`);
  }

  private async seedTimeSlots(): Promise<void> {
    const existingTimeSlots = await db.select().from(timeSlots).limit(1);
    
    // Only seed if there are no time slots yet
    if (existingTimeSlots.length > 0) {
      console.log("Time slots already exist, skipping seeding...");
      return;
    }
    
    console.log("Seeding time slots...");
    
    // Create available time slots for the next 30 days
    const today = new Date();
    
    // Generate time slots from 9:00 AM to 5:30 PM with 30-minute intervals
    const times: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip lunch hour (1:00 PM to 2:00 PM)
        if (hour === 13) continue;
        
        const hourDisplay = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour < 12 ? "AM" : "PM";
        const minuteDisplay = minute === 0 ? "00" : minute;
        times.push(`${hourDisplay}:${minuteDisplay} ${amPm}`);
      }
    }
    
    // Generate slots for today and the next 30 days (limited to reduce initial load)
    let slotsCreated = 0;
    for (let i = 0; i <= 30; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
        continue;
      }
      
      const dateStr = futureDate.toISOString().split('T')[0];
      
      for (const time of times) {
        await this.createTimeSlot({
          date: dateStr,
          time: time,
          available: true
        });
        slotsCreated++;
      }
    }
    
    // Additionally add time slots for specific dates in the UI mockups
    const mockupDates = ["2025-04-01", "2025-04-02", "2025-04-03"];
    for (const mockupDate of mockupDates) {
      for (const time of times) {
        await this.createTimeSlot({
          date: mockupDate,
          time: time,
          available: true
        });
        slotsCreated++;
      }
    }
    
    console.log(`Seeded ${slotsCreated} time slots successfully`);
  }
  
  private async seedProducts(): Promise<void> {
    const existingProducts = await db.select().from(products).limit(1);
    
    // Only seed if there are no products yet
    if (existingProducts.length > 0) {
      console.log("Products already seeded, skipping...");
      return;
    }
    
    console.log("Seeding products...");
    
    const initialProducts: InsertProduct[] = [
      {
        name: "Premium Electric Toothbrush",
        description: "Advanced sonic technology with multiple cleaning modes and smart timer for optimal dental hygiene.",
        price: "79.99",
        imageUrl: "/assets/products/electric-toothbrush.jpg",
        category: "dental-care",
        stock: 25,
        featured: true
      },
      {
        name: "Antibacterial Mouthwash",
        description: "Alcohol-free formula that kills 99.9% of germs that cause bad breath, plaque, and gingivitis.",
        price: "12.99",
        imageUrl: "/assets/products/mouthwash.jpg",
        category: "dental-care",
        stock: 50,
        featured: true
      },
      {
        name: "Professional Teeth Whitening Kit",
        description: "Dental-grade whitening system for professional results at home. Removes years of stains in just days.",
        price: "59.99",
        imageUrl: "/assets/products/whitening-kit.jpg",
        category: "whitening",
        stock: 15,
        featured: true
      },
      {
        name: "Invisalign Clear Aligners",
        description: "Custom-made clear aligners for discreet teeth straightening. Consultation required before purchase.",
        price: "1999.99",
        imageUrl: "/assets/products/invisalign.jpg",
        category: "orthodontics",
        stock: 10,
        featured: true
      },
      {
        name: "Sensitive Teeth Toothpaste",
        description: "Clinically proven relief for sensitive teeth. Builds lasting protection against sensitivity with regular use.",
        price: "8.99",
        imageUrl: "/assets/products/sensitive-toothpaste.jpg",
        category: "dental-care",
        stock: 45,
        featured: false
      },
      {
        name: "Water Flosser",
        description: "High-pressure water stream removes debris and bacteria deep between teeth and below the gumline.",
        price: "49.99",
        imageUrl: "/assets/products/water-flosser.jpg",
        category: "dental-care",
        stock: 20,
        featured: false
      },
      {
        name: "Orthodontic Wax",
        description: "Provides relief from braces irritation. Safe, non-toxic formula that's easy to apply.",
        price: "5.99",
        imageUrl: "/assets/products/ortho-wax.jpg",
        category: "orthodontics",
        stock: 60,
        featured: false
      },
      {
        name: "Fluoride Dental Rinse",
        description: "Strengthens enamel and helps prevent cavities. Ideal for daily use after brushing.",
        price: "7.99",
        imageUrl: "/assets/products/fluoride-rinse.jpg",
        category: "dental-care",
        stock: 40,
        featured: false
      }
    ];
    
    for (const product of initialProducts) {
      await this.createProduct(product);
    }
    
    console.log(`Seeded ${initialProducts.length} products successfully`);
  }
}