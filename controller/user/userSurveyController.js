const SurveyModel = require('../../Model/surveyModel')


function addSurvey(req, res) {
    // console.log(req.body)
    validaters = ''
    if (req.body.occupation == undefined || req.body.occupation == '') {
        validaters += 'invalid occupation'
    }
    if (req.body.income == undefined || req.body.income == '') {
        validaters += 'invalid income'
    }
    if (req.body.education == undefined || req.body.education == '') {
        validaters += 'invalid income'
    }
    if (req.body.email == undefined || req.body.email == '') {
        validaters += 'invalid email'
    }
    if (req.body.userId == undefined || req.body.userId == '') {
        validaters += 'invalid userId'
    }
    if (!!validaters) {
        res.json({
            'message': validaters
        })
    }
    else {
        SurveyModel.findOne({ 'email': req.body.email }).exec()
            .then(surveyData => {
                if (surveyData == null || surveyData == '') {
                    let surveyObj = new SurveyModel()
                    surveyObj.occupation = req.body.occupation
                    surveyObj.income = req.body.income
                    surveyObj.education = req.body.education
                    surveyObj.email = req.body.email
                    surveyObj.userId = req.body.userId
                    surveyObj.save()

                    res.json({
                        'status': 200,
                        'success': true,
                        'message': 'survey filled',
                    })
                }
                else {
                    res.json({
                        'status': 200,
                        'success': false,
                        'message': 'already submitted'
                    })
                }

            })
            .catch(err => {
                res.json({
                    'status': 500,
                    'success': false,
                    'message': String(err) + 'error'
                })

            })

    }
}

function getSurveyData(req, res) {
    SurveyModel.find({}).populate('userId').exec()
        .then(surveyData => {
            if (surveyData == null || surveyData == '') {
                res.json({
                    'status': 200,
                    'success': false,
                    'message': 'no data exist'
                })
            }
            else {
                res.json({
                    'status': 200,
                    'success': true,
                    'message': 'data loaded',
                    'data': surveyData
                })
            }
        })
        .catch(error => {
            res.json({
                'status': 500,
                'success': false,
                'message': String(error)
            })
        })

}

module.exports = {
    addSurvey,
    getSurveyData
}