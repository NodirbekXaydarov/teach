from odoo import http
from odoo.http import request


class CompanyController(http.Controller):

    @http.route('/teacher', type='json', auth='user')
    def get_teacher(self):
        # O'qituvchilarni olish uchun 'teach' modelini to'g'ri chaqiramiz
        teachers = request.env['teacher'].search([])  # Barcha o'qituvchilarni olish uchun
        print("___________________________________________________________________________________________________")
        print(teachers)
        print("___________________________________________________________________________________________________")

        # O'qituvchilarni JSON shaklida qaytarish
        data = [{'name': teacher.name_teacher, 'family_name': teacher.family_name_teacher} for teacher in teachers]
        return {'success': True, 'data': data}
