from odoo import models, fields


class Student(models.Model):
    _name = 'student'
    _description = 'student for teach'
    _inherit = 'teacher'

    name_student = fields.Char(string='Student name')
    family_name_student = fields.Char(string='Student family name')

    teacher_id = fields.Many2one('teacher', string='Teacher')

    teacher_name = fields.Char(related='teacher_id.name_teacher', string="Teacher's First Name", store=True)
    teacher_family_name = fields.Char(related='teacher_id.family_name_teacher', string="Teacher's Last Name", store=True)
    gender = fields.Selection([
        ('female', 'Female'),
        ('male', 'Male'),
        ('divided', 'Divided')
    ], string='Gender')
    img_upload = fields.Binary(string='Image Upload')
    file_upload = fields.Json(string='File Upload', default=[])
    chart_upload = fields.Char(string='Chart Upload')
    map_chart = fields.Char(string='Map Chart')
    def action_generate_report(self):
        return self.env.ref('teach.property_report').report_action(self)
