import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AdminForm({
    _id,
    name: existingName,
    email: existingEmail,
    password: existingPassword,
    role: assignedgRole,
}) {
    const [name, setName] = useState(existingName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [password, setPassword] = useState(existingPassword || '');
    const [role, setRole] = useState(assignedgRole || '')
}






//npm install -g npm@9.6.7