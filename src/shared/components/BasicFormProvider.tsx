import { yupResolver } from "@hookform/resolvers/yup";
import {
  DeepPartial,
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import * as yup from "yup";

interface ISubmitModulesForm<T> {
  children: React.ReactNode;
  schema?: yup.ObjectSchema<DeepPartial<T>>;
  submit?: (data: T, methods?: UseFormReturn<DeepPartial<T>, any, any>) => void;
  onError?: (handler: FieldErrors<any>) => void;
  defaultValue?: any;
  values?: any;
  className?: string;
}
// million-ignore
export function BasicFormProvider<T>({
  children,
  submit,
  onError,
  defaultValue,
  values,
  schema,
  className = "p-10",
}: ISubmitModulesForm<T>) {
  // hooks
  const currentMethods = useForm({
    defaultValues: defaultValue ?? {},
    values: values,
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: schema ? yupResolver(schema) : undefined,
  });

  return (
    <form
      onSubmit={
        submit
          ? currentMethods.handleSubmit((data) => submit(data), onError)
          : undefined
      }
      className={className}
    >
      <FormProvider {...currentMethods}>{children}</FormProvider>
    </form>
  );
}
