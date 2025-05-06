const ServiceService = require("../services/serviceService");

const ServiceController = {
  async createService(req, res) {
    const { businessId, serviceName, description, durationMin, price } =
      req.body;
    try {
      const newService = await ServiceService.createService(
        businessId,
        serviceName,
        description,
        durationMin,
        price
      );
      res.status(201).json(newService);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getServiceById(req, res) {
    const { id } = req.params;
    try {
      const service = await ServiceService.getServiceById(id);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllServicesByBusinessId(req, res) {
    const { businessId } = req.params;
    try {
      const services = await ServiceService.getAllServicesByBusinessId(
        businessId
      );
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllServicesByBusinessEmail(req, res) {
    const { email } = req.params;
    console.log("he recibido en getServices esto: ", email);
    try {
      const services = await ServiceService.getAllServicesByBusinessEmail(
        email
      );
      res.status(200).json(services);
      console.log("lo que se envia desde controller es:", services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllServices(req, res) {
    try {
      const services = await ServiceService.getAllServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateService(req, res) {
    const { id } = req.params;
    const { service_name, description, duration_min, price } = req.body;

    // Construir objeto con solo los campos que vienen en la petición
    const fieldsToUpdate = {};
    if (service_name !== undefined) fieldsToUpdate.service_name = service_name;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (duration_min !== undefined) fieldsToUpdate.duration_min = duration_min;
    if (price !== undefined) fieldsToUpdate.price = price;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided to update" });
    }

    try {
      const updatedService = await ServiceService.updateService(
        id,
        fieldsToUpdate
      );
      if (!updatedService) {
        return res.status(404).json({ error: "Service not found" });
      }
      return res.status(200).json(updatedService);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteService(req, res) {
    const { id } = req.params;
    try {
      const deletedService = await ServiceService.deleteService(id);
      if (!deletedService)
        return res.status(404).json({ error: "Service not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ServiceController;
