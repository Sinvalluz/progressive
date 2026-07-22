import { api } from "@/lib/api-client";

export default async function logout() {
   await api.get('/logout');
}