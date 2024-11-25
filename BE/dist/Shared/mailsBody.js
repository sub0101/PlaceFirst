"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applied_company = exports.registerd_body = void 0;
const registerd_body = (user_name, app_name) => {
    return (`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: left;
      color: #333333;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      background-color: #f4f4f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Welcome to [Your App Name]!
    </div>
    <div class="content">
      <p>Hi ${user_name},</p>
      <p>Congratulations! Your account has been successfully registered. We’re thrilled to have you onboard.</p>
      <p>You can now explore and enjoy all the features of [Your App Name]. Click the button below to get started:</p>
      <a href="[Insert Your Link Here]" class="button">Get Started</a>
      <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:support@yourapp.com">support@yourapp.com</a>.</p>
      <p>Best regards,<br>The [Your App Name] Team</p>
    </div>
    <div class="footer">
      &copy; [Year] ${app_name}. All rights reserved.<br>
      [Your Company Address or Contact Info]
    </div>
  </div>
</body>
</html>
`);
};
exports.registerd_body = registerd_body;
const applied_company = (user_name, company_name, application_url) => {
    return (`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #2196f3;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
      color: #333;
      text-align: left;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      background-color: #2196f3;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Application Submitted!
    </div>
    <div class="content">
      <p>Hi ${user_name},</p>
      <p>We are excited to inform you that your application for <strong> ${company_name} </strong> has been successfully submitted!</p>
      <p>Thank you for using <strong>Placetrack</strong>. Stay tuned for updates on the status of your application.</p>
      <p>To view your application details or track the status, click the button below:</p>
      <a href=${application_url} class="button">Track My Application</a>
      <p>If you have any questions, feel free to contact us at <a href="mailto:support@placetrack.com">support@placetrack.com</a>.</p>
      <p>Best regards,<br>The Placetrack Team</p>
    </div>
    <div class="footer">
      &copy; [2024] Placetrack. All rights reserved.<br>
     
    </div>
  </div>
</body>
</html>
`);
};
exports.applied_company = applied_company;
//# sourceMappingURL=mailsBody.js.map