import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

type Props = Pick<
  MuiButtonProps,
  "children" | "color" | "disabled" | "fullWidth" | "onClick" | "variant"
>;

export const Button = (props: Props) => {
  return <MuiButton {...props} />;
};
