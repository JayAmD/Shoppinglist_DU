import UuShoppinglists from "uu_shoppinglists_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UuShoppinglists.Bricks.Detail.Item`, () => {
  testProperties(UuShoppinglists.Bricks.Detail.Item, CONFIG);
});
