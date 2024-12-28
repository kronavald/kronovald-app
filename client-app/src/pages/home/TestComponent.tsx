import { defaultQueryFn } from "@/api"
import { useQuery } from "@tanstack/react-query"

const TestComponent = () => {
    const { data, isSuccess } = useQuery({
        queryFn: () => defaultQueryFn({ queryKey: [""] }),
        queryKey: ["test"],
    })

    return <div>{isSuccess ? JSON.stringify(data) : "loading"}</div>
}

export default TestComponent
