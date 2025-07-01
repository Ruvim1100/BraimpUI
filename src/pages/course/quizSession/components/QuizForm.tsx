// components/QuizForm.tsx
import React from 'react'
import { useFormik, type FormikHelpers } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import type { QuizQuestionLookupModel } from '../../../../models/questions/getQuestionList'
import type { AnswerOption, AttemptAnswer } from '../../../../models/answers/createAnswers'

// Ваши типы

interface Props {
  questions: QuizQuestionLookupModel[]
  quizAttemptId: string
  onSuccess?: () => void
}

interface FormValues {
  [questionId: string]: string | string[]
}

export const QuizForm: React.FC<Props> = ({ questions, quizAttemptId, onSuccess }) => {
  // 1) Initial values
  const initialValues: FormValues = {}
  questions.forEach((q) => {
    if (q.questionType === 'MultipleChoice') initialValues[q.id] = []
    else initialValues[q.id] = ''
  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      // 2) Сбор AttemptAnswer
      const attemptAnswers: AttemptAnswer[] = questions.map((q) => ({
        id: q.id,               // здесь можно сгенерить новый GUID
        questionText: q.text,
        questionType: q.questionType,
        weight: q.weight,
        quizAttemptId,
      }))

      // 3) Сбор AnswerOption
      const answerOptions: AnswerOption[] = []
      questions.forEach((q) => {
        const val = values[q.id]
        if (q.questionType === 'SingleChoice' && typeof val === 'string') {
          const opt = q.questionOptionModels?.find((o) => o.id === val)
          if (opt) {
            answerOptions.push({
              id: opt.id,
              text: opt.text,
              isCorrect: opt.isCorrect,
              isSelected: true,
              attemptAnswerId: q.id,
            })
          }
        } else if (q.questionType === 'MultipleChoice' && Array.isArray(val)) {
          val.forEach((optId) => {
            const opt = q.questionOptionModels?.find((o) => o.id === optId)
            if (opt) {
              answerOptions.push({
                id: opt.id,
                text: opt.text,
                isCorrect: opt.isCorrect,
                isSelected: true,
                attemptAnswerId: q.id,
              })
            }
          })
        } else if (q.questionType === 'Text' && typeof val === 'string') {
          answerOptions.push({
            id: `${q.id}-text`,
            text: val,
            isCorrect: false,
            isSelected: true,
            attemptAnswerId: q.id,
          })
        }
      })

      // 4) Отправка
      try {
        await axios.post('/api/quiz/submit', { attemptAnswers, answerOptions })
        onSuccess?.()
      } catch (err) {
        console.error(err)
        helpers.setSubmitting(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {questions.map((q) => (
        <Box key={q.id} mb={4}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">
              <Typography variant="h6">{q.text}</Typography>
            </FormLabel>

            {q.questionType === 'SingleChoice' && (
              <RadioGroup
                name={q.id}
                value={formik.values[q.id] as string}
                onChange={formik.handleChange}
              >
                {q.questionOptionModels?.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    value={opt.id}
                    control={<Radio />}
                    label={opt.text}
                  />
                ))}
              </RadioGroup>
            )}

            {q.questionType === 'MultipleChoice' && (
              <Box>
                {q.questionOptionModels?.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    control={
                      <Checkbox
                        name={q.id}
                        value={opt.id}
                        checked={(formik.values[q.id] as string[]).includes(opt.id)}
                        onChange={(e) => {
                          const current = formik.values[q.id] as string[]
                          if (e.target.checked) {
                            formik.setFieldValue(q.id, [...current, opt.id])
                          } else {
                            formik.setFieldValue(
                              q.id,
                              current.filter((id) => id !== opt.id)
                            )
                          }
                        }}
                      />
                    }
                    label={opt.text}
                  />
                ))}
              </Box>
            )}

            {q.questionType === 'Text' && (
              <TextField
                fullWidth
                multiline
                minRows={3}
                name={q.id}
                value={formik.values[q.id] as string}
                onChange={formik.handleChange}
              />
            )}
          </FormControl>
        </Box>
      ))}

      <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
        Отправить ответы
      </Button>
    </form>
  )
}