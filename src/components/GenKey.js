import { generateKeys } from "../utils/operation";
import { useState } from "react";

export default function GenKey() {
  const [loading, setLoading] = useState(false);
  async function onKeys() {
    try {
      setLoading(true);
      await generateKeys();
      alert("Transaction successful!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <button disabled={loading} onClick={onKeys}>
        {/* TODO 7.c - Show "loading..." when buying operation is pending */}
        {loading === true ? "Loading..." : "Generate Private Key"}
      </button>
    </div>
  );
}
