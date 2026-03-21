import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Template
from app.config import settings

class EmailService:
    @staticmethod
    def send_admin_notification(inquiry_data: dict):
        """Send notification email to admin about new inquiry"""
        subject = f"New Inquiry from {inquiry_data['name']} – Techwired Solutions"
        
        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #8B5CF6; }
                .value { margin-top: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🔔 New Inquiry Received</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">{{ name }}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value">{{ email }}</div>
                    </div>
                    <div class="field">
                        <div class="label">Phone:</div>
                        <div class="value">{{ phone or 'Not provided' }}</div>
                    </div>
                    <div class="field">
                        <div class="label">Service Type:</div>
                        <div class="value">{{ service_type }}</div>
                    </div>
                    <div class="field">
                        <div class="label">Budget:</div>
                        <div class="value">{{ budget }}</div>
                    </div>
                    <div class="field">
                        <div class="label">Requirements:</div>
                        <div class="value">{{ requirements }}</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        template = Template(html_template)
        html_content = template.render(**inquiry_data)
        
        EmailService._send_email(settings.ADMIN_EMAIL, subject, html_content)
    
    @staticmethod
    def send_client_confirmation(email: str, name: str):
        """Send confirmation email to client"""
        subject = "Thanks for Contacting Techwired Solutions"
        
        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #8B5CF6 0%, #C084FC 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
                .highlight { color: #8B5CF6; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✨ Thank You, {{ name }}!</h1>
                </div>
                <div class="content">
                    <p>We've received your inquiry and we're excited to help you with your digital journey!</p>
                    
                    <p>Our team at <span class="highlight">Techwired Solutions</span> will review your requirements and get back to you within <span class="highlight">24-48 hours</span>.</p>
                    
                    <h3>What happens next?</h3>
                    <ul>
                        <li>Our team reviews your requirements</li>
                        <li>We prepare a customized proposal</li>
                        <li>We schedule a consultation call</li>
                        <li>We start building your digital presence!</li>
                    </ul>
                    
                    <p>In the meantime, if you have any urgent questions, feel free to reach out to us:</p>
                    <p>
                        📧 Email: s.techwired@gmail.com<br>
                        📱 Phone: +977 9843641508<br>
                        📍 Location: Budhanilkantha, Kathmandu
                    </p>
                    
                    <div class="footer">
                        <p>© 2025 Techwired Solutions — Built with ❤️ in Nepal</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        template = Template(html_template)
        html_content = template.render(name=name)
        
        EmailService._send_email(email, subject, html_content)
    
    @staticmethod
    def _send_email(to_email: str, subject: str, html_content: str):
        """Internal method to send email via SMTP"""
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = settings.SMTP_USER
            msg['To'] = to_email
            msg['Subject'] = subject
            
            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)
            
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
                
            print(f"Email sent successfully to {to_email}")
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            # In production, you might want to log this or raise an exception
