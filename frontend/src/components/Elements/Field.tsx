import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";

type Props = Pick<MuiTextFieldProps, "label" | "error">;

export const Field = (props: Props) => {
  return <MuiTextField {...props} />;
};
