from odoo import models, fields

class Teach(models.Model):
    _name = 'teach'
    _description = 'Teach for odoo'

    name_teacher = fields.Char(string='Teacher name')
    family_name_teacher = fields.Char(string='Teacher family name')

    student_ids = fields.One2many('teach_example', 'teacher_id', string='Students')
