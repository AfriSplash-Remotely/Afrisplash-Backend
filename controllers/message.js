const Message = require('../model/messages');
const { validateContactUsSchema } = require('../middleware/validators');

exports.contactUs = async (req, res) => {
  try {
    const { error, value } = validateContactUsSchema(req.body);
    if (error) return res.status(400).send(error.details);
    const { first_name, last_name, email, message, additional_details } = value;

    const newMessage = await Message.create([
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        message: message,
        additional_details: additional_details
      }
    ]);

    await newMessage[0].save();

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to send message',
      error: error
    });
  }
};
