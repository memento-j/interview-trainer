import { Link } from "react-router"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CheckCircle2, Menu, MessageSquare } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,} from "@/components/ui/navigation-menu"
import { useProfile } from "@/hooks/useProfile";
import { Spinner } from "./Spinner";
import { House, Briefcase, UserRound, CircleQuestionMark, LogOut, Settings, History } from "lucide-react";

export default function NavBar() {
  const { user, session, loading, signOut } = useAuth();
  const { data: profile } = useProfile(user?.id, session?.access_token);

  return (
    <div>
      <NavigationMenu viewport={false} className="flex justify-between max-w-full mx-auto bg-zinc-100 dark:bg-[#0F0F11] gap-5 py-8 border-b-1 border-[#E4E4E7] dark:border-[#161618] z-20"> 
        <div className="font-[500] text-2xl sm:text-3xl ml-6 md:ml-10 lg:ml-15 bg-gradient-to-b from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
          <Link to="/">
          <div className="flex gap-3">
            <div className="relative inline-flex items-center justify-center mt-1">
              <MessageSquare className="w-8 h-8 text-teal-500" />
              <CheckCircle2 className="w-4 h-4 text-teal-600 absolute bottom-0 right-0 bg-white dark:bg-zinc-900 rounded-full" />
            </div>
            <p>PractiMate</p>
          </div>
          </Link>
        </div>
        {/* Mobile nav bar !!!!!!!!! has errors when opening remember to fix later !!!!!!!!!!!!! */}
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
            <NavigationMenuList className="hidden md:flex gap-3 mr-10">
              <NavigationMenuItem>
                <Link to="/practice">
                    <Button className="bg-zinc-100 dark:bg-[#0F0F11] text-zinc-800 dark:text-zinc-200 xl:text-[16px] border border-[#bebec2] dark:hover:bg-zinc-900 hover:bg-zinc-200 dark:border-[#3c3c3f] hover:cursor-pointer bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 border-none rounded-2xl"><Briefcase className="w-6 h-6 mt-0.5" />Interview Practice</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="ml-5">
                <NavigationMenuTrigger className="font-[500] dark:hover:bg-zinc-900 bg-zinc-100 dark:bg-[#0F0F11] xl:text-[16px]">Overview</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[120px] gap-2">
                    <NavigationMenuLink asChild>
                      <Link to="/" className="flex flex-row items-center gap-3">
                        <House className="text-teal-500 dark:text-teal-600 !w-6 !h-6"/>
                        <p className="text-[16px] font-[500]">Home</p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/faq" className="flex flex-row items-center gap-3">
                        <CircleQuestionMark className="text-teal-500 dark:text-teal-600 !w-6 !h-6"/>
                        <p className="text-[16px] font-[500]">FAQ</p>
                      </Link>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="mr-20">
                <Spinner variant="circle" size={36} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <ThemeToggle/>
              </NavigationMenuItem>
            </NavigationMenuList>
          ) : (
            <NavigationMenuList className="hidden md:flex gap-3 mr-10">
                <NavigationMenuItem>
                  <Link to="/practice">
                      <Button className="bg-zinc-100 dark:bg-[#0F0F11] text-zinc-800 dark:text-zinc-200 xl:text-[16px] border border-[#bebec2] dark:hover:bg-zinc-900 hover:bg-zinc-200 dark:border-[#3c3c3f] hover:cursor-pointer bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 border-none rounded-2xl"><Briefcase className="w-6 h-6 mt-0.5" />Interview Practice</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="ml-5">
                  <NavigationMenuTrigger className="font-[500] dark:hover:bg-zinc-900 bg-zinc-100 dark:bg-[#0F0F11] xl:text-[16px]">Overview</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[120px] gap-2">
                      <NavigationMenuLink asChild>
                        <Link to="/" className="flex flex-row items-center gap-3">
                          <House className="text-teal-500 dark:text-teal-600 !w-6 !h-6"/>
                          <p className="text-[16px] font-[500]">Home</p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/faq" className="flex flex-row items-center gap-3">
                          <CircleQuestionMark className="text-teal-500 dark:text-teal-600 !w-6 !h-6"/>
                          <p className="text-[16px] font-[500]">FAQ</p>
                        </Link>
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="xl:mr-12 lg:mr-6">
                    { !user ? 
                      ( 
                        <Link to="/auth">
                          <Button className="bg-zinc-100 dark:bg-[#0F0F11] text-zinc-800 dark:text-zinc-200 xl:text-[16px] border border-[#bebec2] dark:hover:bg-zinc-900 hover:bg-zinc-200 dark:border-[#3c3c3f] hover:cursor-pointer bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 border-none rounded-2xl"><UserRound className="w-6 h-6" />Signin/Signup</Button>
                        </Link>
                      ) : (
                        <div>
                            {profile ? (
                              <NavigationMenuTrigger className="!bg-transparent !focus:bg-transparent !hover:bg-transparent">
                                <div className="flex items-center justify-center w-11 h-11 mt-0.5 pb-1 rounded-full bg-gradient-to-br from-teal-400 to-teal-200 dark:from-teal-800 dark:to-teal-600 font-semibold text-xl">
                                  {profile?.username?.charAt(0)}
                                </div>
                              </NavigationMenuTrigger>
                            ): (
                              <Spinner variant="circle" size={36} className="mr-10"/>
                            )}
                          <NavigationMenuContent className="right-0 left-auto">
                            <ul className="grid gap-0 md:w-[200px] lg:w-[250px] xl:w-[300px]">
                              <li className="p-2 font-[700] text-xl mb-1 ml-1">Welcome, {profile?.username}</li>
                              <NavigationMenuLink asChild>
                                <Link to="/account" className="flex flex-row items-center gap-3">
                                  <Settings className="!w-6 !h-6 text-teal-500 dark:text-teal-600" />
                                  <p className="text-[16px] leading-none font-medium mb-1">Manage Account</p>
                                </Link>
                              </NavigationMenuLink>
                              <NavigationMenuLink asChild>
                                <Link to="/account/practice-sessions" className="flex flex-row items-center gap-3">
                                  <History className="!w-6 !h-6 text-teal-500 dark:text-teal-600" />
                                  <p className="text-[16px] leading-none font-medium mb-1">View All Sessions</p>
                                </Link>
                              </NavigationMenuLink>
                              <NavigationMenuLink asChild>
                                <Link to="#" className="flex flex-row items-center gap-3" onClick={signOut}>
                                    <LogOut className="!w-6 !h-6 text-teal-500 dark:text-teal-600" />
                                    <p className="text-[16px] leading-none font-medium mb-1">Sign out</p>
                                </Link>
                              </NavigationMenuLink>
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