import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const service = await storage.getService(serviceId);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  app.get("/api/time-slots", async (req, res) => {
    try {
      const date = req.query.date as string;
      
      if (!date) {
        return res.status(400).json({ message: "Date parameter is required" });
      }
      
      const timeSlots = await storage.getAvailableTimeSlots(date);
      res.json(timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      res.status(500).json({ message: "Failed to fetch time slots" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      // Validate appointment data
      const appointmentData = insertAppointmentSchema.parse(req.body);
      
      // Create appointment
      const appointment = await storage.createAppointment(appointmentData);
      
      // In a real implementation, we would send SMS confirmation here using Twilio
      // Example Twilio implementation (commented out as we don't have actual credentials):
      /*
      const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await twilioClient.messages.create({
        body: `Your appointment for ${appointment.appointmentDate} at ${appointment.appointmentTime} has been confirmed. Thank you for choosing Village Dental!`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: appointment.phone
      });
      */
      
      // Mark appointment as confirmed
      const confirmedAppointment = await storage.confirmAppointment(appointment.id);
      
      res.status(201).json(confirmedAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
