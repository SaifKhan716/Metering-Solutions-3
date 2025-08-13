// const Meter = require("../model/Meter");
// const User = require("../model/User");
// const NotificationModel = require("../model/Notification");
// const sendEmail = require("../utils/sendEmail");
// // const sendSMS = require("../utils/sendOTPsms");
// const { sendSMS } = require("../utils/sendOTPsms");
// const {
//   renderEmailTemplate,
//   alertColors,
//   renderSMSTemplate,
// } = require("../utils/emailTextTemplates");
// const { formatPhoneNumber } = require("../utils/phoneFormater");

// // const ALERT_CONFIG = {
// //   "Low Balance": {
// //     message: "Your balance is low. Please recharge soon.",
// //     sendTo: { User: "Email" },
// //   },
// //   "Balance Expired": {
// //     message: "Your balance has expired. Emergency 2 units activated.",
// //     // sendTo: { User: "Email", Admin: "Text" },
// //         sendTo: { User: "Email", Admin: "Email" },
// //   },
// //   "Recharge Successful": {
// //     message: "Recharge of ₹100 successful. New balance: ₹150.",
// //     sendTo: { User: "Email" },
// //   },
// //   "Recharge Failed": {
// //     message: "Recharge failed. Please try again or check payment method.",
// //     sendTo: { User: "Email" },
// //   },
// //   "Reminder to Recharge": {
// //     message: "Hey! It’s been a while since your last recharge. Need help?",
// //     // sendTo: { User: "Text" },
// //        sendTo: { User: "Email" },
// //   },
// //   "Magnetic Interference": {
// //     message:
// //       "We detected possible magnetic interference on Meter ID #MTR888 (User ID #USR333). Please ensure the area is safe.",
// //     // sendTo: { User: "Email", Admin: "Text" },
// //         sendTo: { User: "Email", Admin: "Email" },
// //   },
// //   "Neutral Voltage Issue": {
// //     message:
// //       "Voltage fluctuation detected – this may damage appliances (Meter ID #MTR678).",
// //     sendTo: { Admin: "Email" },
// //   },
// //   "Reverse Polarity": {
// //     message:
// //       "Reverse current detected for Meter ID #MTR321 (User ID #USR654). Downlink sent to protect the system.",
// //     // sendTo: { Admin: "Text" },

// //       sendTo: { Admin: "Email" },
// //   },
// //   "High Load Usage": {
// //     message:
// //       "High load detected on Meter ID #MTR456 for User ID #USR789. Please reduce usage to avoid overload.",
// //     // sendTo: { User: "Text", Admin: "Email" },
// //        sendTo: { User: "Email", Admin: "Email" },
// //   },
// //   "Current Imbalance": {
// //     message:
// //       "Phase current imbalance noticed – please check wiring or load for Meter ID #MTR567.",
// //     // sendTo: { Admin: "Text" },
// //         sendTo: { Admin: "Email" },
// //   },
// // };

// const ALERT_CONFIG = {
//   "Low Balance": {
//     message:
//       "Alert: Meter {METER_ID} for User {USER_ID} has low balance of ₹{VALUE}. Please recharge soon.",
//     sendTo: { User: "Email" },
//   },
//   "Balance Expired": {
//     message:
//       "Balance expired for Meter {METER_ID}. Emergency 2 units activated for User {USER_ID}.",
//     sendTo: { User: "Email", Admin: "Text" },
//     // sendTo: { User: "Email", Admin: "Email" },
//   },
//   "Recharge Successful": {
//     message: "Recharge successful on Meter {METER_ID}. New balance: ₹{VALUE}.",
//     sendTo: { User: "Email" },
//   },
//   "Recharge Failed": {
//     message:
//       "Recharge failed on Meter {METER_ID} for User {USER_ID}. Please retry.",
//     sendTo: { User: "Email" },
//   },
//   "Reminder to Recharge": {
//     message:
//       "Reminder: It's been a while since last recharge for Meter {METER_ID}. Balance: ₹{VALUE}.",
//     sendTo: { User: "Text" },
//     // sendTo: { User: "Email" },
//   },
//   "Magnetic Interference": {
//     message:
//       "Possible magnetic interference detected on Meter {METER_ID} for User {USER_ID}. Please inspect.",
//     sendTo: { User: "Email", Admin: "Text" },
//     // sendTo: { User: "Email", Admin: "Email" },
//   },
//   "Neutral Voltage Issue": {
//     message:
//       "Voltage fluctuation detected on Meter {METER_ID}. May damage appliances.",
//     sendTo: { Admin: "Email" },
//   },
//   "Reverse Polarity": {
//     message:
//       "Reverse current detected on Meter {METER_ID} (User {USER_ID}). Immediate action taken.",
//     sendTo: { Admin: "Text" },
//     // sendTo: { Admin: "Email" },
//   },
//   "High Load Usage": {
//     message:
//       "High load usage ({VALUE}kW) detected on Meter {METER_ID} for User {USER_ID}.",
//     sendTo: { User: "Text", Admin: "Email" },
//     // sendTo: { User: "Email", Admin: "Email" },
//   },
//   "Current Imbalance": {
//     message:
//       "Phase current imbalance detected on Meter {METER_ID}. Please check wiring.",
//     sendTo: { Admin: "Text" },
//     // sendTo: { Admin: "Email" },
//   },
// };

// const sendNotification = async ({ meterId, data }) => {
//   try {
//     const meter = await Meter.findById(meterId)
//       // .populate({
//       //   path: "assingnedUserId",
//       .populate({
//   path: "assignedUserId",
//         select:
//           "-password -refreshToken -otp -otpExpiresAt -actionHistory -__v",
//         populate: {
//           path: "adminId",
//           select:
//             "-password -refreshToken -otp -otpExpiresAt -actionHistory -__v",
//         },
//       })
//       .select("-__v");

//     if (!meter) {
//       console.error(`Meter not found for meterId: ${meterId}`);
//       return;
//     }

//     // const user = meter.assingnedUserId;
//     const user = meter.assignedUserId; // ✅ Correct spelling
//     const admin = user?.adminId;

//     if (!user) {
//       console.error("User not found for this meter");
//       return;
//     }

//     // const toEmail = user.email;
//     // const toPhone = user.phonenumber;
//     // const adminEmail = admin?.email;
//     // const adminPhone = admin?.phonenumber;

//     const toEmail = user.email;
//     const toPhone = formatPhoneNumber(user.phonenumber);
//     const adminEmail = admin?.email;
//     const adminPhone = admin?.phonenumber
//       ? formatPhoneNumber(admin.phonenumber)
//       : null;

//     //     // Format phone number before sending SMS
//     // const userPhoneFormatted = formatPhoneNumber(user.phonenumber);
//     // const adminPhoneFormatted = admin?.phonenumber ? formatPhoneNumber(admin.phonenumber) : null;

//     // console.log("=====adminPhone========",adminPhone,"====userPhone======",user.phonenumber,user)

//     const time = new Date();

//     // Combine tempor alerts and Low Balance alert if balance < 50
//     let alertsToProcess = [...data.tamper];

//     if (data.balance_amount.value < 50) {
//       alertsToProcess.push({
//         value: "Low Balance",
//         unit: data.balance_amount.value,
//       });
//     }

//     for (const alertObj of alertsToProcess) {
//       const alertType = alertObj.value;
//       // console.log("=======alertObj=======",alertObj)
//       const config = ALERT_CONFIG[alertType];

//       if (!config) {
//         console.warn(`Alert config not found for type: ${alertType}`);
//         continue;
//       }

//       const sendToConfig = config.sendTo;

//       //   // Prepare dynamic message by replacing placeholders

//       // Correct: Use config.message, not alertObj.message
//       const customMessage = config.message
//         .replace(/{METER_ID}/g, meter._id || "N/A")
//         .replace(/{USER_ID}/g, user._id.toString())
//         .replace(/{VALUE}/g, alertObj.unit != null ? alertObj.unit : "");

//       console.log(
//         "===meterId==userId===Value=",
//         meter._id,
//         user._id,
//         alertObj.unit
//       );
//       console.log("====customMessage====", customMessage);

//       const emailHtml = renderEmailTemplate({
//         alertTitle: alertType,
//         color: alertColors[alertType] || ["Default"],
//         userId: user._id.toString(),
//         meterId: meter.meterSerialNumber || "N/A",
//         alertMessage: customMessage,
//         value: alertObj.unit != null ? alertObj.unit : "N/A",
//         time: new Date().toLocaleString(),
//       });

//       //       for (const recipient in sendToConfig) {
//       //         const mode = sendToConfig[recipient]; // "Email" or "Text"

//       //         let recipientEmail = null;
//       //         let recipientPhone = null;
//       //         let recipientId = null;

//       //         if (recipient === "User") {
//       //           recipientEmail = toEmail;
//       //           recipientPhone = toPhone;
//       //           recipientId = user._id;
//       //         } else if (recipient === "Admin") {
//       //           recipientEmail = adminEmail;
//       //           recipientPhone = adminPhone;
//       //           recipientId = admin?._id;
//       //         }

//       //         if (!recipientId) {
//       //           console.warn(`Recipient ${recipient} details not found`);
//       //           continue;
//       //         }

//       //         // Send Notification (Email/SMS)
//       //         if (mode === "Email" && recipientEmail) {
//       //           // await sendEmail(recipientEmail, `Alert: ${alertType}`, customMessage);
//       //           await sendEmail(toEmail, `Alert: ${alertType}`, emailHtml, true);
//       //           console.log(`Email sent to ${recipient}: ${recipientEmail}`);
//       //         }

//       //         if (mode === "Text" && recipientPhone) {
//       // //           const smsContent = renderSMSTemplate({
//       // //             alertType,
//       // //             userId: user._id.toString(),
//       // //             meterId: meter.meterSerialNumber || "N/A",
//       // //             value: alertObj.unit != null ? alertObj.unit : "N/A",
//       // //             time: new Date().toLocaleString(),
//       // //             message: config.message
//       // //               .replace(/{METER_ID}/g, meter.meterSerialNumber || "N/A")
//       // //               .replace(/{USER_ID}/g, user._id.toString())
//       // //               .replace(/{VALUE}/g, alertObj.unit != null ? alertObj.unit : ""),
//       // //           });
//       // // console.log("===recipientPhone====smsContent==",recipientPhone,smsContent)

//       //  // await sendSMS(recipientPhone, smsContent);
//       //          await sendSMS(recipientPhone, customMessage);

//       //           console.log(`SMS sent to ${recipient}: ${recipientPhone}`);
//       //         }

//       //         // Save Notification in DB
//       //         const notificationPayload = {
//       //           alertType,
//       //           message: customMessage,
//       //           value: alertObj.unit,
//       //           mode,
//       //           time,
//       //         };

//       //         const updateResult = await NotificationModel.updateOne(
//       //           { userId: recipientId, meterId },
//       //           {
//       //             $push: {
//       //               userNotification: {
//       //                 $each: [notificationPayload],
//       //                 $position: 0,
//       //                 $slice: 50,
//       //               },
//       //             },
//       //             $set: { lastNotificationDate: time },
//       //           },
//       //           { upsert: true }
//       //         );

//       //         if (updateResult.matchedCount > 0) {
//       //           console.log(
//       //             `Notification updated for ${recipient}: ${recipientId} | Alert: ${alertType}`
//       //           );
//       //         } else {
//       //           console.log(
//       //             `Notification created for ${recipient}: ${recipientId} | Alert: ${alertType}`
//       //           );
//       //         }
//       //       }

//       for (const recipient in sendToConfig) {
//         const mode = sendToConfig[recipient]; // "Email" or "Text"

//         let recipientEmail = null;
//         let recipientPhone = null;
//         let recipientId = null;

//         if (recipient === "User") {
//           recipientEmail = toEmail;
//           recipientPhone = toPhone;
//           recipientId = user._id;
//         } else if (recipient === "Admin") {
//           recipientEmail = adminEmail;
//           recipientPhone = adminPhone;
//           recipientId = admin?._id;
//         }

//         if (!recipientId) {
//           console.warn(`Recipient ${recipient} details not found`);
//           continue;
//         }

//         // Fetch Notification Status for recipient
//         const recipientNotificationConfig = await NotificationModel.findOne({
//           userId: recipientId,
//           meterId: meterId,
//         }).select("status");

//         const isNotificationEnabled =
//           recipientNotificationConfig?.status === "enabled";

//         const notificationPayload = {
//           alertType,
//           message: customMessage,
//           value: alertObj.unit,
//           mode,
//           time,
//         };

//         // Always Save Notification in DB
//         // await NotificationModel.updateOne(
//         //   { userId: recipientId, meterId,   adminId:admin },
//         //   {
//         //     $push: {
//         //       userNotification: {
//         //         $each: [notificationPayload],
//         //         $position: 0,
//         //         $slice: 50,
//         //       },
//         //     },
//         //     $set: { lastNotificationDate: time },
//         //   },
//         //   { upsert: true }
//         // );


//         await NotificationModel.updateOne(
//   { 
//     userId: recipientId, 
//     meterId: meterId,
//     adminId: admin?._id || null 
//   },
//   {
//     $push: {
//       userNotification: {
//         $each: [notificationPayload],
//         $position: 0,
//         $slice: 50,
//       },
//     },
//     $set: { lastNotificationDate: time },
//   },
//   { upsert: true }
// );


//         if (!isNotificationEnabled) {
//           console.log(
//             `Notification for ${recipient} is DISABLED, skipped sending`
//           );
//           continue; // Skip sending notification if status is disabled
//         }

//         // Send Notification (Email/SMS)
//         if (mode === "Email" && recipientEmail) {
//           await sendEmail(
//             recipientEmail,
//             `Alert: ${alertType}`,
//             emailHtml,
//             true
//           );
//           console.log(`Email sent to ${recipient}: ${recipientEmail}`);
//         }

//         if (mode === "Text" && recipientPhone) {
//           await sendSMS(recipientPhone, customMessage);
//           console.log(`SMS sent to ${recipient}: ${recipientPhone}`);
//         }

//         console.log(
//           `Notification saved for ${recipient}: ${recipientId} | Alert: ${alertType}`
//         );
//       }
//     }
//   } catch (err) {
//     console.error("Failed to send notifications:", err.message);
//     throw err;
//   }
// };

// module.exports = { sendNotification };





























const Meter = require("../model/Meter");
const User = require("../model/User");
const NotificationModel = require("../model/Notification");
const sendEmail = require("../utils/sendEmail");
// const sendSMS = require("../utils/sendOTPsms");
const { sendSMS } = require("../utils/sendOTPsms");
const {
  renderEmailTemplate,
  alertColors,
  renderSMSTemplate,
} = require("../utils/emailTextTemplates");
const { formatPhoneNumber } = require("../utils/phoneFormater");

// const ALERT_CONFIG = {
//   "Low Balance": {
//     message: "Your balance is low. Please recharge soon.",
//     sendTo: { User: "Email" },
//   },
//   "Balance Expired": {
//     message: "Your balance has expired. Emergency 2 units activated.",
//     // sendTo: { User: "Email", Admin: "Text" },
//         sendTo: { User: "Email", Admin: "Email" },
//   },
//   "Recharge Successful": {
//     message: "Recharge of ₹100 successful. New balance: ₹150.",
//     sendTo: { User: "Email" },
//   },
//   "Recharge Failed": {
//     message: "Recharge failed. Please try again or check payment method.",
//     sendTo: { User: "Email" },
//   },
//   "Reminder to Recharge": {
//     message: "Hey! It’s been a while since your last recharge. Need help?",
//     // sendTo: { User: "Text" },
//        sendTo: { User: "Email" },
//   },
//   "Magnetic Interference": {
//     message:
//       "We detected possible magnetic interference on Meter ID #MTR888 (User ID #USR333). Please ensure the area is safe.",
//     // sendTo: { User: "Email", Admin: "Text" },
//         sendTo: { User: "Email", Admin: "Email" },
//   },
//   "Neutral Voltage Issue": {
//     message:
//       "Voltage fluctuation detected – this may damage appliances (Meter ID #MTR678).",
//     sendTo: { Admin: "Email" },
//   },
//   "Reverse Polarity": {
//     message:
//       "Reverse current detected for Meter ID #MTR321 (User ID #USR654). Downlink sent to protect the system.",
//     // sendTo: { Admin: "Text" },

//       sendTo: { Admin: "Email" },
//   },
//   "High Load Usage": {
//     message:
//       "High load detected on Meter ID #MTR456 for User ID #USR789. Please reduce usage to avoid overload.",
//     // sendTo: { User: "Text", Admin: "Email" },
//        sendTo: { User: "Email", Admin: "Email" },
//   },
//   "Current Imbalance": {
//     message:
//       "Phase current imbalance noticed – please check wiring or load for Meter ID #MTR567.",
//     // sendTo: { Admin: "Text" },
//         sendTo: { Admin: "Email" },
//   },
// };

const ALERT_CONFIG = {
  "Low Balance": {
    message:
      "Alert: Meter {METER_ID} for User {USER_ID} has low balance of ₹{VALUE}. Please recharge soon.",
    sendTo: { User: "Email" },
  },
  "Balance Expired": {
    message:
      "Balance expired for Meter {METER_ID}. Emergency 2 units activated for User {USER_ID}.",
    sendTo: { User: "Email", Admin: "Text" },
    // sendTo: { User: "Email", Admin: "Email" },
  },
  "Recharge Successful": {
    message: "Recharge successful on Meter {METER_ID}. New balance: ₹{VALUE}.",
    sendTo: { User: "Email" },
  },
  "Recharge Failed": {
    message:
      "Recharge failed on Meter {METER_ID} for User {USER_ID}. Please retry.",
    sendTo: { User: "Email" },
  },
  "Reminder to Recharge": {
    message:
      "Reminder: It's been a while since last recharge for Meter {METER_ID}. Balance: ₹{VALUE}.",
    sendTo: { User: "Text" },
    // sendTo: { User: "Email" },
  },
  "Magnetic Interference": {
    message:
      "Possible magnetic interference detected on Meter {METER_ID} for User {USER_ID}. Please inspect.",
    sendTo: { User: "Email", Admin: "Text" },
    // sendTo: { User: "Email", Admin: "Email" },
  },
  "Neutral Voltage Issue": {
    message:
      "Voltage fluctuation detected on Meter {METER_ID}. May damage appliances.",
    sendTo: { Admin: "Email" },
  },
  "Reverse Polarity": {
    message:
      "Reverse current detected on Meter {METER_ID} (User {USER_ID}). Immediate action taken.",
    sendTo: { Admin: "Text" },
    // sendTo: { Admin: "Email" },
  },
  "High Load Usage": {
    message:
      "High load usage ({VALUE}kW) detected on Meter {METER_ID} for User {USER_ID}.",
    sendTo: { User: "Text", Admin: "Email" },
    // sendTo: { User: "Email", Admin: "Email" },
  },
  "Current Imbalance": {
    message:
      "Phase current imbalance detected on Meter {METER_ID}. Please check wiring.",
    sendTo: { Admin: "Text" },
    // sendTo: { Admin: "Email" },
  },
};

const sendNotification = async ({ meterId, data }) => {
  try {
    const meter = await Meter.findById(meterId)
      // .populate({
      //   path: "assingnedUserId",
      .populate({
  path: "assignedUserId",
        select:
          "-password -refreshToken -otp -otpExpiresAt -actionHistory -__v",
        populate: {
          path: "adminId",
          select:
            "-password -refreshToken -otp -otpExpiresAt -actionHistory -__v",
        },
      })
      .select("-__v");

    if (!meter) {
      console.error(`Meter not found for meterId: ${meterId}`);
      return;
    }

    // const user = meter.assingnedUserId;
    const user = meter.assignedUserId; // ✅ Correct spelling
    const admin = user?.adminId;

    if (!user) {
      console.error("User not found for this meter");
      return;
    }



    const toEmail = user.email;
    const toPhone = formatPhoneNumber(user.phonenumber);
    const adminEmail = admin?.email;
    const adminPhone = admin?.phonenumber
      ? formatPhoneNumber(admin.phonenumber)
      : null;

   

    const time = new Date();

    // Combine tempor alerts and Low Balance alert if balance < 50
    let alertsToProcess = [...data.tamper];

    if (data.balance_amount.value < 50) {
      alertsToProcess.push({
        value: "Low Balance",
        unit: data.balance_amount.value,
      });
    }

    for (const alertObj of alertsToProcess) {
      const alertType = alertObj.value;
      // console.log("=======alertObj=======",alertObj)
      const config = ALERT_CONFIG[alertType];

      if (!config) {
        console.warn(`Alert config not found for type: ${alertType}`);
        continue;
      }

      const sendToConfig = config.sendTo;

      //   // Prepare dynamic message by replacing placeholders

      // Correct: Use config.message, not alertObj.message
      const customMessage = config.message
        .replace(/{METER_ID}/g, meter._id || "N/A")
        .replace(/{USER_ID}/g, user._id.toString())
        .replace(/{VALUE}/g, alertObj.unit != null ? alertObj.unit : "");

      console.log(
        "===meterId==userId===Value=",
        meter._id,
        user._id,
        alertObj.unit
      );
      console.log("====customMessage====", customMessage);

      const emailHtml = renderEmailTemplate({
        alertTitle: alertType,
        color: alertColors[alertType] || ["Default"],
        userId: user._id.toString(),
        meterId: meter.meterSerialNumber || "N/A",
        alertMessage: customMessage,
        value: alertObj.unit != null ? alertObj.unit : "N/A",
        time: new Date().toLocaleString(),
      });

   

      for (const recipient in sendToConfig) {
        const mode = sendToConfig[recipient]; // "Email" or "Text"

        let recipientEmail = null;
        let recipientPhone = null;
        let recipientId = null;

        if (recipient === "User") {
          recipientEmail = toEmail;
          recipientPhone = toPhone;
          recipientId = user._id;
        } else if (recipient === "Admin") {
          recipientEmail = adminEmail;
          recipientPhone = adminPhone;
          recipientId = admin?._id;
        }

        if (!recipientId) {
          console.warn(`Recipient ${recipient} details not found`);
          continue;
        }

        // Fetch Notification Status for recipient
        const recipientNotificationConfig = await NotificationModel.findOne({
          userId: recipientId,
          meterId: meterId,
        }).select("status");

        const isNotificationEnabled =
          recipientNotificationConfig?.status === "enabled";

        const notificationPayload = {
          alertType,
          message: customMessage,
          value: alertObj.unit,
          mode,
          time,
        };

      


        await NotificationModel.updateOne(
  { 
    userId: recipientId, 
    meterId: meterId,
    adminId: admin?._id || null 
  },
  {
    $push: {
      userNotification: {
        $each: [notificationPayload],
        $position: 0,
        $slice: 50,
      },
    },
    $set: { lastNotificationDate: time },
  },
  { upsert: true }
);


        if (!isNotificationEnabled) {
          console.log(
            `Notification for ${recipient} is DISABLED, skipped sending`
          );
          continue; // Skip sending notification if status is disabled
        }

        // Send Notification (Email/SMS)
        if (mode === "Email" && recipientEmail) {
          await sendEmail(
            recipientEmail,
            `Alert: ${alertType}`,
            emailHtml,
            true
          );
          console.log(`Email sent to ${recipient}: ${recipientEmail}`);
        }

        if (mode === "Text" && recipientPhone) {
          await sendSMS(recipientPhone, customMessage);
          console.log(`SMS sent to ${recipient}: ${recipientPhone}`);
        }

        console.log(
          `Notification saved for ${recipient}: ${recipientId} | Alert: ${alertType}`
        );
      }
    }
  } catch (err) {
    console.error("Failed to send notifications:", err.message);
    throw err;
  }
};

module.exports = { sendNotification };

