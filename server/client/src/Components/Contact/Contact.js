import React from "react";

import { useForm } from "react-hook-form";

import styled from "styled-components";
import Button from "../Button/Button";
import Label from "../Label/Label";
import Textarea from "../Textarea/Textarea";
import Input from "../Input/Input";
import TextareaAutosize from "react-textarea-autosize";
import { rgba } from "polished";
import {
  faCalendar,
  faBriefcase,
  faComments,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

function Contact({ className, ...props }) {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async values => {
    console.log(values);
    await fetch("http://localhost:30662/api/contact", {
      method: "post",
      body: JSON.stringify({
        email: values.email,
        message: values.message
      }),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    window.location.href = "/thanks";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <h1>Contact Us</h1>
      <Label required>Email</Label>
      <input
        name="email"
        ref={register({
          required: "You must input an email address",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
      ></input>
      {errors.email && errors.email.message}
      <Label required>Message</Label>
      <textarea
        name="message"
        ref={register({ required: "You must include a message" })}
        rows={5}
      ></textarea>
      {errors.message && errors.message.message}
      <div>
        <Button type="submit" icon={faPaperPlane}>
          SUBMIT
        </Button>
      </div>
    </form>
  );
}

export default styled(Contact)`
  display: flex;
  flex-direction: column;

  * {
    margin-bottom: 8px;
  }

  input,
  textarea {
    background: ${rgba("#77126E", 0.05)};
    border: 1px solid #77126e;
    padding: 8px 16px;
    border-radius: 16px;
    font-size: 20px;
    color: #3b3b3b;
    box-shadow: 0px 3px 6px 0px ${rgba("#77126e", 0.1)};
    font-family: "Blinker SemiBold" !important;
    resize: none;
  }
`;
