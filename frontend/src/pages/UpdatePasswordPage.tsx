import { motion } from "framer-motion";
import { UpdatePasswordForm } from '@/components/update-password-form';

export default function UpdatePasswordPage() {
    return (
        //supabase auth component
        <div className="min-h-screen flex items-center justify-center pb-50 bg-zinc-100 dark:bg-[#0F0F11] text-zinc-50">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-full max-w-xs sm:max-w-lg md:max-w-2xl"
            >
                <UpdatePasswordForm/>
            </motion.div>
        </div>
    )
}