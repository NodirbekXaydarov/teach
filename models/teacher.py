from odoo import models, fields

class Teacher(models.Model):
    _name = 'teacher'
    _description = 'Teacher for school'

    name_teacher = fields.Char(string='Teacher name')
    family_name_teacher = fields.Char(string='Teacher family name')

    student_ids = fields.One2many('student', 'teacher_id', string='Students')
