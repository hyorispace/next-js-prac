import "styled-components";
import { Breakpoints, Colors, FontSize, FontWeight, Heights } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    breakpoints: Breakpoints;
    fontSize: FontSize;
    fontWeight: FontWeight;
    heights: Heights;
  }
}
