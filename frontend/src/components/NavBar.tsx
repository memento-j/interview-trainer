import * as React from "react"
import { Link } from "react-router"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,} from "@/components/ui/navigation-menu"
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "./ui/skeleton";

export default function NavBar() {
  const { user, session, loading, signOut } = useAuth();
  const { data: profile } = useProfile(user?.id, session?.access_token);

  return (
    <div>
      <NavigationMenu viewport={false} className="flex justify-between max-w-full mx-auto bg-zinc-100 dark:bg-[#0F0F11] gap-5 py-8 border-b-1 border-[#E4E4E7] dark:border-[#161618] z-20"> 
        <p className="font-[500] text-2xl sm:text-3xl ml-6 md:ml-15 bg-gradient-to-b from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent"><Link to="/">PractiMate</Link></p>
        {/* Mobile nav bar !!!!!!!!! has errors remember to fix later !!!!!!!!!!!!! */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                  <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-zinc-200 dark:bg-[#0F0F11]">
                <div className="mt-10">
                  <div className="flex flex-col gap-1 p-3">
                    <Link to="/" className="font-[700] text-lg underline">Home</Link>
                  </div>
                  <div className="flex flex-col gap-1 p-3">
                    <p className="font-[700] text-lg">Interview Trainer</p>
                    <Link to="/practice" className="font-medium underline">Interview Practice</Link>
                  </div>
                  {!user ? (
                    <Link to="/auth">
                      <Button className="w-full">Sign in</Button>
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-1 p-3">
                      <p className="font-[700] text-lg">Welcome, {profile?.username}</p>
                      <Link to="/account" className="underline">Manage Account</Link>
                      <Link to="/account/practice-sessions" className="underline">View Practice Sessions</Link>
                      <Button className="mt-30 hover:cursor-pointer" variant="destructive" onClick={signOut}>Sign out</Button>
                    </div>

                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop nav bar */}
          { loading ? (
            <Skeleton className="mr-50 h-11 w-32 rounded-2xl" />
          ) : (
            <NavigationMenuList className="hidden md:flex gap-3 mr-10">
              <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-[500] dark:hover:bg-zinc-900 bg-zinc-100 dark:bg-[#0F0F11] xl:text-[16px]">Home</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[150px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/">
                            <div className="font-medium">Home</div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/faq">
                            <div className="font-medium">FAQ</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/practice">
                      <Button className="bg-zinc-100 dark:bg-[#0F0F11] text-zinc-800 dark:text-zinc-200 xl:text-[16px] border border-[#bebec2] dark:hover:bg-zinc-900 hover:bg-zinc-200 dark:border-[#3c3c3f] hover:cursor-pointer bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 border-none rounded-2xl">Interview Practice</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="xl:mr-12 lg:mr-6">
                    { !user ? 
                      ( 
                        <Link to="/auth">
                          <Button className="bg-zinc-100 dark:bg-[#0F0F11] text-zinc-800 dark:text-zinc-200 xl:text-[16px] border border-[#bebec2] dark:hover:bg-zinc-900 hover:bg-zinc-200 dark:border-[#3c3c3f] hover:cursor-pointer bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 border-none rounded-2xl">Signin/Signup</Button>
                        </Link>
                      ) : (
                        <div>
                          <NavigationMenuTrigger className="!bg-transparent !focus:bg-transparent !hover:bg-transparent">
                            <div className="flex items-center justify-center w-11 h-11 mt-0.5 pb-1 rounded-full bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 font-semibold text-xl">
                                {profile?.username?.charAt(0)}
                            </div>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="right-0 left-auto">
                            <ul className="grid gap-2 md:w-[200px] lg:w-[250px] xl:w-[300px]">
                              <li className="p-2 font-[700] text-xl">Welcome, {profile?.username}</li>
                              <ListItem href="/account" title="Manage Account">
                                View and update your account info here.
                              </ListItem>
                              <ListItem href="/account/practice-sessions" title="View Practice Sessions">
                                Reivew and update past practice interview sessions.
                              </ListItem>
                              <ListItem href="/#"  title="Sign out" onClick={() => signOut()}>
                                Click here to sign out.
                              </ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </div>
                      )
                    }
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <ThemeToggle/>
                </NavigationMenuItem>
            </NavigationMenuList>          
          )}
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}