"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successfully_applied = void 0;
const successfully_applied = (name, company_name, date) => __awaiter(void 0, void 0, void 0, function* () {
    return `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #4caf50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
    }
    .email-body h2 {
      font-size: 20px;
      color: #4caf50;
    }
    .email-body p {
      font-size: 16px;
      line-height: 1.6;
      margin: 10px 0;
    }
    .email-footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #555;
    }
    .email-footer a {
      color: #4caf50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Application Successful!</h1>
    </div>
    <div class="email-body">
      <h2>Dear ${name},</h2>
      <p>
        Congratulations! Your application to <strong>${company_name} </strong> has been successfully submitted on <strong>[Date]</strong>.
      </p>
      <p>
        We are thrilled to have you in our selection process. The next steps will be communicated shortly. If you have any questions, please feel free to reach out to us.
      </p>
      <p>
        Best of luck with your application! We're excited to help you take the next big step in your career.
      </p>
    </div>
    <div class="email-footer">
      <p>
        Regards,<br>
        <strong>Placement Team</strong><br>
        <a href="#">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>

    `;
});
exports.successfully_applied = successfully_applied;
//# sourceMappingURL=mailBody.js.map