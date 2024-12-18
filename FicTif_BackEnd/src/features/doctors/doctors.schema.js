import { z } from "zod";

const specialityEnum = [
	"Neurology",
	"Diagnostic",
	"Hospital Director",
	"Oncology",
	"Surgery",
	"Immunology",
];

const RegisterDoctorSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(3, { message: "Doit avoir au minimum 3 caractères" })
		.max(50, { message: "Doit avoir au maximum 50 caractères" }),
	lastName: z
		.string()
		.trim()
		.min(3, { message: "Doit avoir au minimum 3 caractères" })
		.max(50, { message: "Doit avoir au maximum 50 caractères" }),
	birthDate: z.string().refine(
		(dateString) => {
			const date = new Date(dateString);
			return date < new Date();
		},
		{ message: "Date de naissance invalide" }
	),
	email: z.string().email({ message: "Email invalide" }),
	password: z
		.string()
		.trim()
		.min(6, { message: "Doit avoir au minimum 6 caractères" }),
	adress: z
		.string()
		.trim()
		.min(8, { message: "Doit avoir au minimum 10 caractères" })
		.max(120, { message: "Doit avoir au maximum 120 caractères" }),
	phoneNumber: z
		.string()
		.trim()
		.length(10)
		.startsWith("0", { message: "Le numéro de téléphone doit commencer par 0" })
		.regex(/^\d{10}$/, {
			message: "Le numéro de téléphone doit contenir uniquement des chiffres.",
		}),
	speciality: z
		.string()
		.trim()
		.refine((value) => specialityEnum.includes(value), {
			message: "La spécialité saisie n'est pas valide.",
		}),
});

const LoginDoctorSchema = z.object({
	email: z.string().email({ message: "Email invalide" }),
	password: z.string().trim(),
});

export { RegisterDoctorSchema, LoginDoctorSchema };
