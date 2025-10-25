import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useProfile } from "@/hooks/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

type ProfileFormInputs = {
    username?: string;
    firstName?: string;
    lastName?: string;
  };

//Form for users to update their profile information
export default function ProfileUpdateForm() {
    const { user, session } = useAuth();
    const { data: profile } = useProfile(user?.id, session?.access_token);
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset ,formState: { errors, isSubmitting } } = useForm({ defaultValues: profile });

    //resets form after profile data changes
    useEffect(() =>  {
        if (profile) {
            reset(profile)
        } 
    }, [profile])

    // React query mutation for updating the profile
    const updateProfile = useMutation({
        mutationFn: async (data: ProfileFormInputs) => {
            return axios.patch(`http://localhost:8080/profiles/${user?.id}`,
                {
                    username: data.username,
                    fname: data.firstName,
                    lname: data.lastName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                    },
                }
            );
        },
        // refetch profile on successful update
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            //invalidates the old query and triggers a refresh so the profile in the cache is up to date
            queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
        },
        onError: (err) => {
            toast.error("Failed to update profile.")
            console.error("Update failed:", err);
        },
    });

    
    async function onSubmit(data: ProfileFormInputs) {
        await updateProfile.mutateAsync(data);
    }

    return(
        <motion.div
            className="w-full rounded-2xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 bg-zinc-100 dark:bg-zinc-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.175 }}
        >
            <Card className="shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all bg-white/60 dark:bg-zinc-900/60 backdrop-blur">
                <CardHeader className="pb-3">
                    <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    Profile Details
                    </CardTitle>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Update your personal information below.
                    </p>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Username */}
                            <div className="space-y-1.5">
                                <Label htmlFor="username" className="text-sm font-medium">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="text-sm sm:text-md focus-visible:ring-teal-500 dark:focus-visible:ring-teal-700"
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: { value: 3, message: "Must be at least 3 characters" },
                                        maxLength: { value: 16, message: "Must be at most 16 characters" },
                                        pattern: { value: /^[A-Za-z0-9_]+$/, message: "Only letters, numbers, and underscores allowed" },
                                    })}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-xs mt-1">{String(errors.username.message)}</p>
                                )}
                            </div>
                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue={user?.email}
                                    disabled
                                    className="text-sm sm:text-md bg-zinc-100 dark:bg-zinc-800/50"
                                />
                            </div>
                            {/* First Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="first-name" className="text-sm font-medium">
                                    First Name
                                </Label>
                                <Input
                                    id="first-name"
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="text-sm sm:text-md focus-visible:ring-teal-500 dark:focus-visible:ring-teal-700"
                                    {...register("firstName", { required: "First name is required" })}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{String(errors.firstName.message)}</p>
                                )}
                            </div>
                            {/* Last Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="last-name" className="text-sm font-medium">
                                    Last Name
                                </Label>
                                <Input
                                    id="last-name"
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="text-sm sm:text-md focus-visible:ring-teal-500 dark:focus-visible:ring-teal-700"
                                    {...register("lastName", { required: "Last name is required" })}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{String(errors.lastName.message)}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-3 mt-5">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-700 text-white shadow-sm"
                        >
                            <Save className="w-4 h-4" />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    );
}