import { z } from "zod";

const RegisterUserSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(3, { msg: "Doit avoir au minimum 3 caractères" })
		.max(50, { msg: "Doit avoir au maximum 50 caractères" }),
	lastName: z
		.string()
		.trim()
		.min(3, { msg: "Doit avoir au minimum 3 caractères" })
		.max(50, { msg: "Doit avoir au maximum 50 caractères" }),
	birthDate: z.string().refine(
		(dateString) => {
			const date = new Date(dateString);
			return date < new Date();
		},
		{ msg: "Date de naissance invalide" }
	),
	email: z.string().email({ msg: "Email invalide" }),
	password: z
		.string()
		.trim()
		.min(6, { msg: "Doit avoir au minimum 6 caractères" }),
	address: z
		.string()
		.trim()
		.min(8, { msg: "Doit avoir au minimum 10 caractères" })
		.max(120, { msg: "Doit avoir au maximum 120 caractères" }),
	phoneNumber: z
		.string()
		.trim()
		.length(10, {
			msg: "Le numéro de téléphone doit être composé de 10 chiffres",
		})
		.startsWith("0", { msg: "Le numéro de téléphone doit commencer par 0" })
		.regex(/^\d{10}$/, {
			msg: "Le numéro de téléphone doit contenir uniquement des chiffres.",
		}),
	gender: z.enum(["man", "woman"]),
});

const LoginUserSchema = z.object({
	email: z.string().email({ msg: "Email invalide" }),
	password: z.string().trim(),
});

export { RegisterUserSchema, LoginUserSchema };
