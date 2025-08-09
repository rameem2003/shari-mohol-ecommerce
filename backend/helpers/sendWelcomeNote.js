const nodemailer = require("nodemailer");

const sendWelcomeNoteEmail = async (email) => {
  html = `<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
    <!--<![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#e1ecf7"></v:fill>
			</v:background>
		<![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table cellpadding="0" cellspacing="0" align="center" class="esd-header-popover es-header">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#581c87" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body" style="background-color:#581c87">
                        <tbody>
                          <tr>
                            <td align="left" background="https://ewrcffp.stripocdn.email/content/guids/CABINET_0fa486e736790bd0e3fdb2f0eb814a76/images/hectorjrivas1fxmet2u5duunsplash_1.png" esd-img-prev-position="center top" class="esd-structure es-p40" style="background-image:url(https://ewrcffp.stripocdn.email/content/guids/CABINET_0fa486e736790bd0e3fdb2f0eb814a76/images/hectorjrivas1fxmet2u5duunsplash_1.png);background-repeat:no-repeat;background-position:center top">
                              <!--[if mso]><table width="520" cellpadding="0"
                            cellspacing="0"><tr><td width="156" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="156" valign="top" align="center" class="es-m-p0r es-m-p20b esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-m-txt-c es-p15b" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ewrcffp.stripocdn.email/content/guids/CABINET_2c3c060d08a84c96e02db6f5fd16ce609f6cd065c5f2229d37082a47a8ff49c3/images/logowhite_WBR.png" alt="" width="156" class="adapt-img" style="display: block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="344" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="344" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="right" class="esd-block-text es-p15t">
                                              <p class="es-m-txt-c">
                                                <a target="_blank" href="tel:(000)123-456-789">+8801409029641</a>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="right" esd-links-underline="underline" class="esd-block-text es-p10t">
                                              <p class="es-m-txt-c">
                                                <a target="_blank" href="mailto:info.rolstudio.bd.gmail.com" style="text-decoration:underline">info.rolstudio.bd.gmail.com</a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p40t es-p30b es-p40r es-p40l es-m-p0b">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="520" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-text">
                                              <h1>
                                                Thanks for your signup
                                              </h1>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td align="left" class="esd-structure es-p30b es-p40r es-p40l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="520" align="center" valign="top" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" class="esd-block-text">
                                              <p>
                                                Hello
                                              </p>
                                              <p>
                                                Thank you for signing up with <strong>Shari Mohol</strong>! 🌸<br> We’re delighted to have you join our community where tradition meets style.
                                              </p>
                                              <p>
                                                From elegant sarees to timeless fashion pieces, your journey with us is just beginning. Explore, shop, and let your style bloom.
                                              </p>
                                              <p>
                                                💌 <strong>Special Welcome Gift:</strong> Keep an eye on your inbox for exclusive offers made just for you!
                                              </p>
                                              <p>
                                                Happy shopping,<br>
<strong>The Shari Mohol Team</strong>
                                              </p>
                                              <p>
                                                <strong><br></strong>
                                              </p>
                                              <p>
                                                Best regards,
                                              </p>
                                              <p>
                                                Shari Mohol
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#581c87" align="center" cellpadding="0" cellspacing="0" width="600" class="es-footer-body" style="background-color:#581c87">
                        <tbody>
                          <tr>
                            <td align="left" background="https://ewrcffp.stripocdn.email/content/guids/CABINET_0fa486e736790bd0e3fdb2f0eb814a76/images/hectorjrivas1fxmet2u5duunsplash_1.png" esd-img-prev-position="center top" class="esd-structure es-p30t es-p30b es-p40r es-p40l" style="background-image:url(https://ewrcffp.stripocdn.email/content/guids/CABINET_0fa486e736790bd0e3fdb2f0eb814a76/images/hectorjrivas1fxmet2u5duunsplash_1.png);background-repeat:no-repeat;background-position:center top">
                              <!--[if mso]><table width="520" cellpadding="0" cellspacing="0"><tr><td width="194" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="left" class="es-left">
                                <tbody>
                                  <tr>
                                    <td width="194" align="left" class="esd-container-frame es-m-p20b">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-m-txt-c es-p15b" style="font-size:0px">
                                              <a target="_blank" href="https://viewstripo.email">
                                                <img src="https://ewrcffp.stripocdn.email/content/guids/CABINET_2c3c060d08a84c96e02db6f5fd16ce609f6cd065c5f2229d37082a47a8ff49c3/images/logowhite.png" alt="" width="194" class="adapt-img" style="display: block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-social" style="font-size: 0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p10r">
                                                      <a target="_blank" href="https://www.facebook.com/rolstudiobangladesh">
                                                        <img src="https://ewrcffp.stripocdn.email/content/assets/img/social-icons/circle-black/facebook-circle-black.png" alt="Fb" title="Facebook" height="24" width="24">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top" class="es-p10r">
                                                      <a target="_blank" href="https://www.facebook.com/rolstudiobangladesh">
                                                        <img src="https://ewrcffp.stripocdn.email/content/assets/img/social-icons/circle-black/instagram-circle-black.png" alt="Ig" title="Instagram" height="24" width="24">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a target="_blank" href="https://www.facebook.com/rolstudiobangladesh">
                                                        <img src="https://ewrcffp.stripocdn.email/content/assets/img/social-icons/circle-black/youtube-circle-black.png" alt="Yt" title="YouTube" height="24" width="24">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="306" valign="top"><![endif]-->
                              <table cellpadding="0" cellspacing="0" align="right" class="es-right">
                                <tbody>
                                  <tr>
                                    <td width="306" align="left" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5t es-p15b">
                                              <p>
                                                <a target="_blank" href="https://viewstripo.email">My account&nbsp;</a>• <a target="_blank" href="https://viewstripo.email">Blog</a>&nbsp;• <a target="_blank" href="https://viewstripo.email">Help</a>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p5b">
                                              <p>
                                                Vestibulum morbi blandit cursus risus at ultrices mi<br><br><a href="https://" target="_blank">Unsubscribe</a>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rameem.me@gmail.com",
      pass: "qdsm esfy vtkg ldso",
    },
  });

  const info = await transporter.sendMail({
    from: "rameem.me@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Thank you for joining Shari Mohol", // Subject line
    text: "Shari Mohol", // plain text body
    html, // html body
  });
};

module.exports = sendWelcomeNoteEmail;
