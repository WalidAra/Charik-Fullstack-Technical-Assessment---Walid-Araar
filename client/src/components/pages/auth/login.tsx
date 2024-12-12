import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LuLoader } from "react-icons/lu";
import { useAuth } from "@/hooks";
import { toast } from "sonner";
import GoogleOAuth from "@/components/atoms/GoogleOAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Define the type for login response
type LoginResponse = {
  status: boolean;
  data: {
    accessToken: string;
  };
  message: string;
};

// Form schema remains the same
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(60),
  recall: z.boolean().default(false).optional(),
});

// Login API call function
const loginUser = async (values: z.infer<typeof formSchema>) => {
  const response = await axios.post<LoginResponse>(
    "http://127.0.0.1:4040/api/public/auth/login/",
    {
      email: values.email,
      password: values.password,
    }
  );
  return response.data;
};

const Login = () => {
  const { setToken } = useAuth();

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      recall: false,
    },
  });

  const { mutate, isPending } = useMutation<
    LoginResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.status === true) {
        const accessToken = response.data.accessToken;
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
        toast.success("Login Successful", {
          description: "Welcome back!",
          richColors: true,
          position: "bottom-center",
        });
      } else {
        toast.error("Login Failed", {
          description: response.message,
          richColors: true,
          position: "bottom-center",
        });
      }
    },
    onError: (error) => {
      toast.error("Uh oh! Something went wrong.", {
        description: error.message,
        richColors: true,
        position: "bottom-center",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col w-[350px] xl:w-[360px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={"/"}
                      className="ml-auto text-foreground inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recall"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 text-muted-foreground font-normal text-sm leading-none">
                  <FormLabel>Remember me for 30 days</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <LuLoader className="size-5 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <GoogleOAuth isSignUp={false} />
      </Form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/auth/register"} className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
