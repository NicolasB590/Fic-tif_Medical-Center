import Appointment from "./appointments.model.js";

const get = (doctor, date) => {
	const query = {
		doctorId: doctor,
		date: { $gte: date },
	};
	return Appointment.findOne(query);
};

const update = (appointmentId, change) => {
	return Appointment.findByIdAndUpdate(appointmentId, change, {
		new: true,
	});
};

const remove = (appointmentId) => {
	return Appointment.findByIdAndDelete(appointmentId);
};

const create = (data) => {
	return Appointment(data).save();
};

const getAllByPatientId = (patientId) => {
	return Appointment.find({ patientId });
};

const getAllByDoctorId = (doctorId) => {
	return Appointment.find({ doctorId });
};

export { get, create, update, remove, getAllByPatientId, getAllByDoctorId };
