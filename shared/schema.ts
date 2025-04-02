import { pgTable, text, serial, integer, timestamp, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Services offered by the dental clinic
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Appointments for dental services
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  patientName: text("patient_name").notNull(),
  patientLastName: text("patient_last_name").notNull(),
  patientDob: text("patient_dob").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  appointmentDate: text("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  patientType: text("patient_type").notNull(), // 'new' or 'returning'
  paymentMethod: text("payment_method").notNull(), // 'cash' or 'insurance'
  insuranceProvider: text("insurance_provider"),
  message: text("message"),
  bookingForSomeoneElse: boolean("booking_for_someone_else").default(false),
  confirmed: boolean("confirmed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({ 
  id: true,
  createdAt: true 
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Available time slots for appointments
export const timeSlots = pgTable("time_slots", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  available: boolean("available").default(true),
});

export const insertTimeSlotSchema = createInsertSchema(timeSlots).omit({ id: true });
export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;
export type TimeSlot = typeof timeSlots.$inferSelect;

// Users for authentication (dentists, admins)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Testimonials from patients
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  patientSince: text("patient_since").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Products for the marketplace section
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // dental care, orthodontics, etc.
  stock: integer("stock").notNull(),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true,
  createdAt: true 
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
