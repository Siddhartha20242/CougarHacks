import { Header } from "./header";
import { BackButton } from "./back-button";
import {
    Card,
    CardFooter,
    CardHeader
} from '@/components/ui/card'


export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-2xl">
            <CardHeader>
                <Header label="Oops! Mistake happened"/>
            </CardHeader>

            <CardFooter>
                <BackButton label="Back to login"
                href="/auth/login"/>
            </CardFooter>
        </Card>
    )
    }