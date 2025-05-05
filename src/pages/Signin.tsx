import { Input, Button } from "@heroui/react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { SigninType } from "../Type";
import { useEffect } from "react";

export default function Signin() {
  const navigate = useNavigate();
  const { handleLogin, isAuthenticated, isPending, errorText } = useAuth();
  console.log("isss", isAuthenticated);
  const handleNavigateBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/cities", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { register, handleSubmit } = useForm<SigninType>();
  const onSubmit: SubmitHandler<SigninType> = (data) => {
    handleLogin(data);
  };

  return (
    <Layout>
      <div className="w-full flex justify-center items-center h-[calc(100vh-80px)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xs flex flex-col gap-4"
        >
          {errorText && (
            <p className="text-red-500 text-center my-1 text-xl">
              Invalid User or password...
            </p>
          )}
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="E-mail"
            labelPlacement="outside"
            {...register("email")}
            placeholder="Enter your email"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid passord"
            label="Passord"
            labelPlacement="outside"
            {...register("password")}
            placeholder="Enter your password"
            type="password"
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit" isLoading={isPending}>
              Sign In
            </Button>
            <Button onPress={handleNavigateBack} variant="flat">
              Back
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
