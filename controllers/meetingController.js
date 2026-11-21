const {Slot, Meeting} = require('../models');

exports.getSlots = async (req, res)=>{
    try{
        const slots = await Slot.findAll();
        res.status(200).json(
            slots);
    }catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMeetings = async (req, res)=>{
    try{
        const meetings = await Meeting.findAll({
            include:{
                model: Slot,
                attributes: ['time', 'meetingLink']
            }
        });
        res.status(200).json(meetings);
    }catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bookMeeting = async (req, res)=>{
    try{
        const {name, email, slotId} = req.body;

        const slot = await  Slot.findByPk(slotId);
        if(!slot){
            return res.status(404).json({ message: 'Slot not found' });
        }
        if (slot.availableSlots <= 0) {
            return res.status(400).json({ message: 'No slots available' });
        }
        const meeting = await Meeting.create({ name, email, slotId });

        slot.availableSlots -= 1;
            await slot.save();

        res.status(201).json({
            id: meeting.id,
            name: meeting.name,
            email: meeting.email,
            time: slot.time,
            meetingLink: slot.meetingLink
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.cancelMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const slot = await Slot.findByPk(meeting.slotId);
    if (slot) {
      slot.availableSlots += 1;
      await slot.save();
    }

    await meeting.destroy();
    res.status(200).json({ message: 'Meeting cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};