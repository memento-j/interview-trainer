import * as React from "react"
import { Link } from "react-router"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function NavBar() {
  const { user, profile, signOut } = useAuth();


  return (
    <NavigationMenu viewport={false} className="flex items-center justify-between max-w-full mx-auto bg-zinc-300 dark:bg-zinc-800 gap-5 py-5 border-b-1 border-[#bebec2] dark:border-[#3c3c3f]">
      <p className="font-[500] text-lg ml-15"> <Link to="/">PrepMate AI</Link></p>
      <NavigationMenuList className="gap-3 mr-10">
      <NavigationMenuItem>
          <NavigationMenuTrigger className="font-[500] dark:hover:bg-zinc-900 bg-zinc-300 dark:bg-zinc-800">Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="#">
                    <div className="font-medium">Home</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="#">
                    <div className="font-medium">About</div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="#">
                    <div className="font-medium">FAQ</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-[500] bg-zinc-300 dark:hover:bg-zinc-900 dark:bg-zinc-800">Interview Trainer</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/practice">
                      <div className="font-medium">Role-specific Questions</div>
                      <div className="text-muted-foreground">
                        Practice questions for a specific role.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#">
                      <div className="font-medium">General Questions</div>
                      <div className="text-muted-foreground">
                        General behavioral interview questions.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
            { !user ? 
              ( 
                <Link to="/auth">
                  <Button className="bg-zinc-300 dark:bg-zinc-800 text-dark dark:text-white border border-[#bebec2] dark:hover:bg-zinc-900 hover:bg-zinc-200 dark:border-[#3c3c3f] hover:cursor-pointer">Sign in</Button>
                </Link>
              ) : (
                <div>
                  <NavigationMenuTrigger className="font-[500] bg-zinc-300 dark:hover:bg-zinc-900 dark:bg-zinc-800">Account</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 md:w-[250px] lg:w-[300px]">
                      <li className="p-2 font-[700] text-xl">Welcome, {profile?.username}</li>
                      <ListItem href="/account" title="Manage Account">
                        View and update your account info here.
                      </ListItem>
                      <ListItem href="/#" title="View Practice Sessions">
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
        <NavigationMenuItem className="ml-35 mr-5">
          <ThemeToggle/>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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