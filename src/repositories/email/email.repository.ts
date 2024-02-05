export default class EmailRepository {
  public forgotPassword = (link:string, username:string ) => {
    const html = `<!doctype html>
   <html lang="en-US">
   
   <head>
       <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
       <title>Reset Password Email Template</title>
       <meta name="description" content="Reset Password Email Template.">
   </head>
   
   <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #fff;">
       <!--100% body table-->
       <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="" style="@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'); background-color: #FBF9F9; padding: 32px; border-radius: 12px;">
           <tr>
               <td>
                   <table style="background-color: white; max-width:640px;  margin:0 auto; border-radius: 12px; margin: 32px auto;" width="100%" border="0"
                       align="center" cellpadding="0" cellspacing="0">
                       <tr>
                           <td>
                               <table style="background-color: white; border-radius: 12px;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                   <thead>
                                       <tr>
                                           <th style="padding: 32px; border-bottom: 1px solid #CED4DA; text-align: center;">
                                               <img src="https://lh3.googleusercontent.com/proxy/Osl3oTvG4YnGSwH_MX82Znd2f2DeR4nswbWbeqrHS3LOK4sM2bv2MxZTm-Otjr5GlboufUROpuZkMgCJKr88JKjFjLdFaKuQFSRItQfnj9pRRFyuKo8" alt="" style="height: 60px; width: 160px;">
                                           </th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr>
                                           <td style="padding: 32px 32px 0px;">
                                               <h3 style="color: #121A26; text-align: center; font-size: 24px; font-weight: 500; margin: 0px; line-height: 140%; font-family: 'Open Sans', sans-serif;">Forgot Your Password?</h3>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td style="padding: 0px 32px;">
                                               <p style="color: #6C757D; text-align: center; font-size: 18px; font-weight: 400; line-height: 150%; letter-spacing: 0.2px; font-family: 'Open Sans', sans-serif; margin: 24px 0px 0px;">
                                                   Hello ${username},
                                               </p>
                                               <span style="color: #6C757D; text-align: center; font-size: 18px; font-weight: 400; line-height: 150%; letter-spacing: 0.2px; font-family: 'Open Sans', sans-serif; display: block; margin: 40px 0px 0px;">
                                                   You are receiving this email because we received a password reset request for your account
                                               </span>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td style="text-align: center;">
                                           <a href="${link}" style="color: white; font-size: 16px; font-weight: 500; line-height: normal; font-family: 'Open Sans' , sans-serif; text-decoration: none; margin-top: 30px; background: #211F21; border-color: #211F21; border-radius: 8px; padding: 15px 121px;  text-align: center;">Reset Your Password </a>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td style="padding: 0px 32px;">
                                               <p style="color: #6C757D; text-align: center; font-size: 18px; font-weight: 400; line-height: 150%; letter-spacing: 0.2px; font-family: 'Open Sans', sans-serif; margin: 30px 0px 32px;">
                                                  If you didn’t request a password reset, no further <br> action is required.
                                               </p>
                                           </td>
                                       </tr>
                                   </tbody>
                                   <tfoot>
                                       <tr>
                                           <td style="padding: 24px 32px 0px; border-top: 1px solid #CED4DA;">
                                               <div>
                                                   <p style="color: #6C757D; text-align: center; font-size: 16px; font-weight: 400; line-height: 150%; letter-spacing: 0.2px; font-family: 'Open Sans', sans-serif; margin: 0;">Problems or questions? Call us at <a href="tel:0402 981 616" style="color: #211F21; text-decoration: none; font-weight: 500;"> 0402 981 616 </a> or email <a href="mailto:info@maxscaffolds.com.au" style="color: #211F21; text-decoration: none; font-weight: 500;"> info@maxscaffolds.com.au</a></p>
                                               </div>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td>
                                               <p style="color: #6C757D; text-align: center; font-size: 16px; font-weight: 400; line-height: 150%; letter-spacing: 0.2px; font-family: 'Open Sans', sans-serif; margin: 12px 0px 24px;">4/513 Olsen Ave, Southport 4215, QLD</p>
                                           </td>
                                       </tr>
                                   </tfoot>
                               </table>
                           </td>
                       </tr>
                   </table>
               </td>
           </tr>
       </table>
       <!--/100% body table-->
   </body>
   
   </html>`;

    return html;
  };
}
