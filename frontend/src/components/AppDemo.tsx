import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion";


export default function AppDemo() {
    const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))
    
    return(
        <div className="py-34 bg-zinc-100 dark:bg-[#0F0F11]">
            <div className="w-full p-6 flex justify-center">
                <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring" }}
                        viewport={{once: false, amount: 0.1}}
                >
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full max-w-xs"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset} 
                    >
                        <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                                </Card>
                            </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </motion.div>
            </div>
        </div>
    )
}