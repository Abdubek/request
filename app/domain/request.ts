import { Document, Paragraph, TextRun, Packer, AlignmentType } from "docx";
import fs from 'fs'

export type Request = {
  id?: string,
  fio: string;
  flight: string;
  advancedInfo: string;
  createdAt?: Date;
}

export const createRequestDoc = (request: Request) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun('Комитет гражданской авиации'),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun('Комитета по защите прав потребителей'),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun('Наименование авиакомпании'),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun('от: ' + request.fio),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('Заявление')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('с требованием компенсации в соответствии со ст. 7 Регламента (ЕС) №261/2004')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(`Я требую компенсацию, связанную с рейсом ${request.flight}, который я забронировал из (аэропорт вылета) в (аэропорт прилета) на (дата бронирования). Рейс был отложен на срок более чем (время задержки) часа ИЛИ был отменен ИЛИ вылетел без меня. Проблема возникла не из-за чрезвычайных обстоятельств или обстоятельств непреодолимой силы. Из-за за задержки на (время задержки рейса) часов и расстояния перелета между аэропортами я имею право на компенсацию (стоимость € на одного пассажира) евро для каждого пассажира. Я пишу это письмо, чтобы попросить вас немедленно оплатить сумму (стоимость € на одного пассажира) евро/пассажир на каждого пассажира, которая составляет общую сумму €/£ (общая сумма компенсации) не позднее, чем через 2 недели с даты этого письма.`)
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(`Мой банковский счет`)
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(`Банк: _ _ _ _ _ _ _ _ _ _ _ _ _ _`)
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(`IBAN: _ _ _ _ _ _ _ _ _ _ _ _ _ _ `)
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(`Swift/BIC: _ _ _ _ _ _ _ _ _ _ _ _ `)
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(`Если я не получу от вас ответа на претензию в течение указанного выше срока, я немедленно обращусь за юридической помощью. `)
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun('')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun('С наилучшими пожеланиями,')
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun(request.fio + ', ' + new Date(request.createdAt || Date.now()).toLocaleDateString("ru-RU"))
          ]
        })
      ]
    }],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`document-${request.id}.docx`, buffer);
  });
}

export const sendDocumentToMail = async (request: Request) => {

}
