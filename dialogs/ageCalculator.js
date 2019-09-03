'use strict'

module.exports = async function (req, res, next) {
	const date = (typeof req.body.queryResult.outputContexts[0].parameters.dateOfBirth !== 'undefined') ? req.body.queryResult.outputContexts[0].parameters.dateOfBirth : ''
	console.log('Date: ', date)
	let msg = ''
	let resp = []
	if (!date) {
		msg = `please tell me your date of birth`
		resp.push({ text: { text: [`${msg}`] } })

	} else {
		console.log('Date: ', date)
		const actualAge = getAge(date)
		msg = `your current age is ${actualAge}`
		resp.push({ text: { text: [`${msg}`] } })
	}
	return res.status(200).json({
		fulfillmentText: msg,
		fulfillmentMessages: resp
	})
}

function getAge(dateOfBirth) {
	var today = new Date();
	var birthDate = new Date(dateOfBirth);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age = age - 1;
	}

	return age;
}
