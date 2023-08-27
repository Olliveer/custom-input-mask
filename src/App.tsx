import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustonInput } from "./components/input-mask";
import { useState } from "react";

const formSchema = z.object({
  maskExample: z.string().min(2).max(20),
});

type maskType = "phone" | "zipCode" | "date" | "time" | "creditCard";

function App() {
  const [maskType, setMaskType] = useState<maskType>("phone");
  const [cleanMaskValue, setCleanMaskValue] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maskExample: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let valueWhitoutMask;
    if (cleanMaskValue) {
      valueWhitoutMask = values.maskExample.replace(/[^0-9]/g, "");
    } else {
      valueWhitoutMask = values.maskExample;
    }
    alert(JSON.stringify(valueWhitoutMask, null, 2));
  }

  function handleSelectMaskType(value: maskType) {
    form.setValue("maskExample", "");
    setMaskType(value);
  }

  const maskExampleValue = form.watch("maskExample");

  return (
    <div className="h-screen w-full bg-[#fafafa] text-gray-900 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-3xl font-bold">
        <a
          className="underline mr-2"
          target="_blank"
          href="https://react-hook-form.com/"
        >
          React Hook Form
        </a>
        +
        <a
          className="underline mx-2"
          target="_blank"
          href="https://github.com/sanniassin/react-input-mask"
        >
          Input Mask
        </a>
        +
        <a
          className="underline ml-2"
          target="_blank"
          href="https://ui.shadcn.com/"
        >
          shadcn/ui
        </a>
      </h1>
      <div className="container w-[500px] p-4 ">
        <Select
          value={maskType}
          onValueChange={(value: maskType) => handleSelectMaskType(value)}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select a mask" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Masks</SelectLabel>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="zipCode">Zipcode</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="creditCard">Credit Card</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="clean-mask-value"
            onCheckedChange={() => setCleanMaskValue(!cleanMaskValue)}
          />
          <label
            htmlFor="clean-mask-value"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remove mask on submit.
          </label>
        </div>

        {cleanMaskValue}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="maskExample"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Input</FormLabel>
                  <FormControl>
                    <CustonInput
                      placeholder="Mask example"
                      {...field}
                      mask={maskType}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!maskExampleValue.length}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default App;
