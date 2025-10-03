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
    <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
        <CardHeader>
            <CardTitle className="text-2xl mt-3">Profile Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:gap-6.5">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="username">Username</Label>
                        </div>
                        <Input 
                        id="username" 
                        type="text" 
                        className="text-sm sm:text-md" 
                        {...register("username", { 
                            required: "Username is required",
                            minLength: { value: 3, message: "Must be at least 3 characters" },
                            maxLength: { value: 16, message: "Must be at most 16 characters" },    
                            pattern: { value: /^[A-Za-z0-9_]+$/, message: "Only letters, numbers, and underscores allowed" },                                
                        }
                        )}/>
                        {errors.username && (
                            <p className="text-red-500 text-sm">{String(errors.username.message)}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="text-sm sm:text-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>First name</Label>
                        <Input
                            id="first-name"
                            type="text"
                            className="text-sm sm:text-md"
                            {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{String(errors.firstName.message)}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Last name</Label>
                        <Input
                            id="last-name"
                            type="text"
                            className="text-sm sm:text-md"
                            {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{String(errors.lastName.message)}</p>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 mt-5">
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="hover:cursor-pointer"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </CardFooter>
        </form>
    </Card>
    );
}