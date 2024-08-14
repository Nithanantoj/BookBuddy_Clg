const Bus = require('../models/busModel')

const getBuses = async(req, res) => {
    try {
        const buses = await Bus.find({})
        res.status(200).json(buses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getBusById = async(req, res) => {
    try {
        const bus = await Bus.findById(req.params.id)
        if (bus) res.status(200).json(bus)
        else res.status(404).json({ message: 'Bus not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createBus = async(req, res) => {
    const bus = new Bus(req.body)
    try {
        const newBus = await bus.save()
        res.status(201).json(newBus)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateBus = async(req, res) => {
    try {
        const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (bus) res.status(200).json(bus)
        else res.status(404).json({ message: 'Bus not found' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteBus = async(req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id)
        if (bus) res.status(204).json({ message: 'Bus deleted successfully' })
        else res.status(404).json({ message: 'Bus not found' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getBuses, getBusById, createBus, updateBus, deleteBus }