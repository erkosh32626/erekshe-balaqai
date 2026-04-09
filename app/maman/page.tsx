"use client"

import { motion } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { User, Award, BookOpen, Heart } from "lucide-react"

export default function MamanPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Маман туралы
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Кәсіби маманның биографиясы мен тәжірибесі
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-blue-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Жеке мәліметтер
                </h2>
              </div>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p><strong>Аты-жөні:</strong> [Маманның аты-жөні]</p>
                <p><strong>Мамандығы:</strong> Логопед, дефектолог</p>
                <p><strong>Тәжірибесі:</strong> 10+ жыл</p>
                <p><strong>Білімі:</strong> Қазақ ұлттық педагогикалық университеті</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-green-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Жетістіктер
                </h2>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• 500+ баланың сөйлеу дағдыларын дамыту</li>
                <li>• Кәсіби конференцияларға қатысу</li>
                <li>• Мақалалар жариялау</li>
                <li>• Сертификаттар мен дипломдар</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Қызметі
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Мен балалардың сөйлеу қабілеттерін дамытуға арналған маманмын. 
              Диагностика жүргізу, жеке бағдарламалар құру және отбасылармен жұмыс істеу 
              менің негізгі қызметтерімнің бірі. Балалардың әрқайсысына жеке көзқараспен 
              қараймын және олардың қажеттіліктеріне сәйкес әдістер қолданамын.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Философия
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Әрбір бала - бұл бірегей тұлға, және оның дамуына көмектесу - менің 
              басты мақсатым. Мен сенемін, ерте араласу және дұрыс әдістермен біз 
              балалардың сөйлеу қабілеттерін толықтай дамыта аламыз. Отбасылармен 
              тығыз жұмыс істеу және қолдау көрсету - табыстың кілті.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  )
}