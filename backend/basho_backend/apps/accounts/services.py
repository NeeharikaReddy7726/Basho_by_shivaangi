from django.core.mail import EmailMultiAlternatives
from django.conf import settings

def send_otp_email(email, otp):
    subject = "Welcome to Basho byy Shivangi"

    text_content = f"""
Welcome to Basho byy Shivangi!

We’re delighted to have you join us.

Your One-Time Password (OTP) is: {otp}

⏳This OTP is valid for 5 minutes.
Do not share this OTP with anyone.

Warm regards,
Team Basho byy Shivangi
"""

    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to Basho byy Shivangi!</h2>

        <p>We’re delighted to have you join us.</p>

        <p>Your One-Time Password (OTP) is:</p>

        <p style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #652810;
            margin: 16px 0;
        ">
          {otp}
        </p>

        <p>⏳ <strong>This OTP is valid for 5 minutes.</strong></p>
        <p>Please do not share this OTP with anyone.</p>

        <br />
        <p>Warm regards,<br /><strong>Team Basho byy Shivangi</strong></p>
      </body>
    </html>
    """

    email_message = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()


def send_welcome_email(email, username):
    subject = "Welcome to Basho byy Shivangi "

    text_content = f"""
Welcome to Basho byy Shivangi, {username}!

Your account has been successfully created.

We’re delighted to have you as part of our community.

Warm regards,
Team Basho byy Shivangi
"""

    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <h2>Welcome to Basho byy Shivangi </h2>

        <p>Hi <strong>{username}</strong>,</p>

        <p>
          Your account has been <strong>successfully created</strong>.
          We’re delighted to have you join our journey of handcrafted elegance.
        </p>

        <p>
          You can now explore our collections, workshops, and custom creations.
        </p>

        <br />

        <p style="color:#652810;">
        Warm regards,<br /> <strong>Team Basho byy Shivangi!</strong>
        </p>
      </body>
    </html>
    """

    email_message = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()
