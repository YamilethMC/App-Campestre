import { Survey, SurveyQuestion, SurveyCategory, SurveyPriority } from '../interfaces';

export const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Satisfacción con Servicios del Club',
    description: 'Ayúdanos a mejorar nuestros servicios compartiendo tu experiencia.',
    category: SurveyCategory.SERVICES,
    priority: SurveyPriority.IMPORTANT,
    estimatedTime: '3-5 min',
    participantCount: 156,
    questionCount: 8,
    isActive: true,
    imageUrl: '',
    averageRating: 4.2,
    dateCreated: '2024-10-01',
  },
  {
    id: '2',
    title: 'Calidad del Restaurante',
    description: 'Evalúa la calidad de nuestros alimentos y servicio en el restaurante.',
    category: SurveyCategory.RESTAURANT,
    priority: SurveyPriority.NORMAL,
    estimatedTime: '4-6 min',
    participantCount: 89,
    questionCount: 10,
    isActive: true,
    imageUrl: '',
    averageRating: 4.5,
    dateCreated: '2024-10-05',
  },
  {
    id: '3',
    title: 'Instalaciones Deportivas',
    description: 'Comparte tu opinión sobre nuestras instalaciones deportivas.',
    category: SurveyCategory.SPORTS,
    priority: SurveyPriority.URGENT,
    estimatedTime: '5-7 min',
    participantCount: 234,
    questionCount: 12,
    isActive: true,
    imageUrl: '',
    averageRating: 3.8,
    dateCreated: '2024-09-25',
  },
  {
    id: '4',
    title: 'Experiencia en Eventos',
    description: 'Ayúdanos a mejorar nuestros eventos y actividades.',
    category: SurveyCategory.EVENTS,
    priority: SurveyPriority.NORMAL,
    estimatedTime: '3-5 min',
    participantCount: 76,
    questionCount: 7,
    isActive: true,
    imageUrl: '',
    averageRating: 4.7,
    dateCreated: '2024-10-10',
  },
  {
    id: '5',
    title: 'Calidad del Servicio General',
    description: 'Evalúa el servicio general del club.',
    category: SurveyCategory.SERVICES,
    priority: SurveyPriority.LOW,
    estimatedTime: '4-6 min',
    participantCount: 321,
    questionCount: 9,
    isActive: false, // Completed survey
    imageUrl: '',
    averageRating: 4.0,
    dateCreated: '2024-08-15',
    dateCompleted: '2024-09-15',
  },
];

export const mockSurveyQuestions: SurveyQuestion[] = [
  // Questions for survey 1
  {
    id: '1-1',
    surveyId: '1',
    question: '¿Cómo calificarías la atención del personal?',
    type: 'rating',
    required: true,
  },
  {
    id: '1-2',
    surveyId: '1',
    question: '¿Qué servicios del club utilizas con mayor frecuencia?',
    type: 'multiple-choice',
    options: ['Alberca', 'Gimnasio', 'Áreas sociales', 'Estacionamiento', 'Otros'],
    required: true,
  },
  {
    id: '1-3',
    surveyId: '1',
    question: '¿Tienes alguna sugerencia para mejorar nuestros servicios?',
    type: 'text',
    required: false,
  },
  {
    id: '1-4',
    surveyId: '1',
    question: '¿Recomendarías nuestro club a amigos o familiares?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '1-5',
    surveyId: '1',
    question: '¿Qué aspecto del club te gustaría que mejoráramos?',
    type: 'text',
    required: false,
  },
  {
    id: '1-6',
    surveyId: '1',
    question: '¿Consideras que el costo-beneficio de nuestros servicios es adecuado?',
    type: 'rating',
    required: true,
  },
  {
    id: '1-7',
    surveyId: '1',
    question: '¿Con qué frecuencia usas las instalaciones del club?',
    type: 'multiple-choice',
    options: ['Diario', 'Varias veces por semana', 'Una vez por semana', 'Ocasionalmente', 'Raramente'],
    required: true,
  },
  {
    id: '1-8',
    surveyId: '1',
    question: '¿Tienes algún comentario adicional?',
    type: 'text',
    required: false,
  },
  // Questions for survey 2
  {
    id: '2-1',
    surveyId: '2',
    question: '¿Cómo calificarías el sabor de los alimentos?',
    type: 'rating',
    required: true,
  },
  {
    id: '2-2',
    surveyId: '2',
    question: '¿Qué tipo de platillos prefieres que ofrezcamos?',
    type: 'multiple-choice',
    options: ['Internacional', 'Regional', 'Vegetariano', 'Opciones saludables', 'Todos los anteriores'],
    required: true,
  },
  {
    id: '2-3',
    surveyId: '2',
    question: '¿Cómo calificarías el tiempo de espera para recibir tu orden?',
    type: 'rating',
    required: true,
  },
  {
    id: '2-4',
    surveyId: '2',
    question: '¿Te gustaría que ampliemos la carta de menú?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '2-5',
    surveyId: '2',
    question: '¿Cuál ha sido tu experiencia con el servicio al cliente en el restaurante?',
    type: 'text',
    required: false,
  },
  {
    id: '2-6',
    surveyId: '2',
    question: '¿Qué horario prefieres para visitar el restaurante?',
    type: 'multiple-choice',
    options: ['Desayuno', 'Comida', 'Cena', 'Todas las opciones'],
    required: true,
  },
  {
    id: '2-7',
    surveyId: '2',
    question: '¿El ambiente del restaurante es agradable?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '2-8',
    surveyId: '2',
    question: '¿Qué platillo recomendarías?',
    type: 'text',
    required: false,
  },
  {
    id: '2-9',
    surveyId: '2',
    question: '¿Algún comentario adicional sobre el restaurante?',
    type: 'text',
    required: false,
  },
  {
    id: '2-10',
    surveyId: '2',
    question: '¿Consideras que los precios son justos por la calidad ofrecida?',
    type: 'rating',
    required: true,
  },
  // Questions for survey 3
  {
    id: '3-1',
    surveyId: '3',
    question: '¿Cómo calificarías el estado de las instalaciones deportivas?',
    type: 'rating',
    required: true,
  },
  {
    id: '3-2',
    surveyId: '3',
    question: '¿Qué instalaciones deportivas usas con mayor frecuencia?',
    type: 'multiple-choice',
    options: ['Gimnasio', 'Canchas de tenis', 'Área de yoga', 'Cancha de fútbol', 'Otras'],
    required: true,
  },
  {
    id: '3-3',
    surveyId: '3',
    question: '¿Te gustaría que adicionáramos nuevas instalaciones?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '3-4',
    surveyId: '3',
    question: '¿Cómo calificarías el horario de disponibilidad de las instalaciones?',
    type: 'rating',
    required: true,
  },
  {
    id: '3-5',
    surveyId: '3',
    question: '¿Tienes sugerencias para mejorar las instalaciones deportivas?',
    type: 'text',
    required: false,
  },
  {
    id: '3-6',
    surveyId: '3',
    question: '¿Qué equipo adicional te gustaría que tuviéramos disponible?',
    type: 'text',
    required: false,
  },
  {
    id: '3-7',
    surveyId: '3',
    question: '¿Te gustaría tener más actividades deportivas organizadas?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '3-8',
    surveyId: '3',
    question: '¿Cómo calificarías la limpieza de las instalaciones?',
    type: 'rating',
    required: true,
  },
  {
    id: '3-9',
    surveyId: '3',
    question: '¿Qué horario es más conveniente para ti?',
    type: 'multiple-choice',
    options: ['Mañana', 'Tarde', 'Noche', 'Todos los horarios'],
    required: true,
  },
  {
    id: '3-10',
    surveyId: '3',
    question: '¿Te gustaría tener acceso a entrenadores o asesores?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '3-11',
    surveyId: '3',
    question: '¿Algún comentario adicional?',
    type: 'text',
    required: false,
  },
  {
    id: '3-12',
    surveyId: '3',
    question: '¿Te gustaría que hubiera más eventos deportivos?',
    type: 'yes-no',
    required: true,
  },
  // Questions for survey 4
  {
    id: '4-1',
    surveyId: '4',
    question: '¿Cómo calificarías los eventos organizados por el club?',
    type: 'rating',
    required: true,
  },
  {
    id: '4-2',
    surveyId: '4',
    question: '¿Qué tipo de eventos te gustaría que organizáramos?',
    type: 'multiple-choice',
    options: ['Familiares', 'Deportivos', 'Culturales', 'Sociales', 'Todos'],
    required: true,
  },
  {
    id: '4-3',
    surveyId: '4',
    question: '¿Con qué frecuencia asistes a los eventos del club?',
    type: 'multiple-choice',
    options: ['Siempre', 'Frecuentemente', 'Ocasionalmente', 'Raramente', 'Nunca'],
    required: true,
  },
  {
    id: '4-4',
    surveyId: '4',
    question: '¿Te gustaría que hubiera más eventos para toda la familia?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '4-5',
    surveyId: '4',
    question: '¿Qué evento memorable has tenido en el club?',
    type: 'text',
    required: false,
  },
  {
    id: '4-6',
    surveyId: '4',
    question: '¿Cómo calificarías la organización de los eventos?',
    type: 'rating',
    required: true,
  },
  {
    id: '4-7',
    surveyId: '4',
    question: '¿Te gustaría participar en la planificación de eventos?',
    type: 'yes-no',
    required: true,
  },
  // Questions for survey 5
  {
    id: '5-1',
    surveyId: '5',
    question: '¿Cómo calificarías el servicio general del club?',
    type: 'rating',
    required: true,
  },
  {
    id: '5-2',
    surveyId: '5',
    question: '¿Qué aspectos del servicio destacarías?',
    type: 'text',
    required: false,
  },
  {
    id: '5-3',
    surveyId: '5',
    question: '¿Qué aspectos consideras que necesitan mejora?',
    type: 'text',
    required: false,
  },
  {
    id: '5-4',
    surveyId: '5',
    question: '¿Recomendarías el club a otros?',
    type: 'yes-no',
    required: true,
  },
  {
    id: '5-5',
    surveyId: '5',
    question: '¿Qué cambiarías del club?',
    type: 'text',
    required: false,
  },
  {
    id: '5-6',
    surveyId: '5',
    question: '¿Cómo calificarías la calidad-precio de los servicios?',
    type: 'rating',
    required: true,
  },
  {
    id: '5-7',
    surveyId: '5',
    question: '¿Tienes alguna sugerencia para mejorar?',
    type: 'text',
    required: false,
  },
  {
    id: '5-8',
    surveyId: '5',
    question: '¿Con qué frecuencia usas los servicios del club?',
    type: 'multiple-choice',
    options: ['Diario', 'Varias veces por semana', 'Una vez por semana', 'Ocasionalmente', 'Casi nunca'],
    required: true,
  },
  {
    id: '5-9',
    surveyId: '5',
    question: '¿Consideras que el club cumple con tus expectativas?',
    type: 'yes-no',
    required: true,
  },
];

export const surveyService = {
  getSurveys: (): Promise<Survey[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSurveys);
      }, 500);
    });
  },

  getSurveyById: (id: string): Promise<Survey | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSurveys.find(survey => survey.id === id));
      }, 300);
    });
  },

  getQuestionsBySurveyId: (surveyId: string): Promise<SurveyQuestion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSurveyQuestions.filter(question => question.surveyId === surveyId));
      }, 300);
    });
  },

  submitSurvey: (surveyId: string, answers: any): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would send the data to backend
        console.log(`Survey ${surveyId} submitted with answers:`, answers);
        resolve(true);
      }, 800);
    });
  },
};