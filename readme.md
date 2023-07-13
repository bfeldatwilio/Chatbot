# Chatbot Demo App

## Overview

This demo app is a basic AI Chat app that targets OpenAI. You will need an Open AI Key.

This app uses Langchain so expansion of functionality can be done without exposing data to OpenAI.

There are three components:

-   **LWC** Chatbot UI components that pass questions back to the Apex class
-   **Apex class** that communicates with the NodeJs Function
-   **NodeJs Function** that houses the Langchain bits and communicates with OpenAI

# Usage

There is a default prompt, so asking questions will use that prompt. Clicking the `prompt` button will bring up a dialog to modify the prompt

# Install

Installation and further docs can be found in this [wiki entry](https://wiki.hq.twilio.com/display/GTMBASFDC/Functions+for+Third+Party+Integration)
