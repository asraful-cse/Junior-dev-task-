import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const parentComp = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(email)) {
      setAlertClass("alert-validate");
      toast.error("Invalid email address");
      return;
    }

    fetch("https://103.108.146.90:5000/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.text())
      .then((data) => JSON.parse(`${data}`))
      .then((data) =>
        toast(data.message, {
          type: data.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR,
        })
      )
      .catch(() => toast.error("Something went wrong. Please try again."));

    setAlertClass("");
  };

  const validate = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <form
      className="w-full flex-w flex-c-m validate-form"
      onSubmit={handleSubmit}
    >
      <div
        ref={parentComp}
        className={"wrap-input100 validate-input where1 " + alertClass}
        data-validate="Valid email is required: user@email.domain"
      >
        <input
          className="input100 placeholder0 s2-txt2"
          type="text"
          name="email"
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="focus-input100"></span>
      </div>

      <button className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1">
        Subscribe
      </button>
    </form>
  );
}
