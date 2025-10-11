"use client"

import { Card } from "@/components/ui/card"
import type { ResumeFormData } from "@/app/curriculo/page"

export function ResumePreview({ formData }: { formData: ResumeFormData }) {
  return (
    <div className="lg:sticky lg:top-20 h-fit">
      <Card
        className="p-12 bg-white text-black min-h-[1000px]"
        style={{
          fontFamily: "'PT Sans', Arial, Helvetica, sans-serif",
          color: "rgb(51, 51, 51)",
        }}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[22px] font-bold text-center leading-[28px] text-black uppercase">
              {formData.fullName || "NOME SOBRENOME"}
            </h1>
            <p className="text-[16px] text-[#6f6f6f] leading-[16px] mb-1">
              {formData.desiredRole || "Back-end Developer | Python Developer"}
            </p>
            <div
              className="flex justify-center items-center gap-2 text-xs flex-wrap"
              style={{ fontSize: "11px", color: "#3e3e3e", lineHeight: "16px" }}
            >
              {formData.phone && <span>{formData.phone}</span>}
              {formData.phone && formData.email && <span>•</span>}
              {formData.email && <span>{formData.email}</span>}
              {formData.email && formData.linkedin && <span>•</span>}
              {formData.linkedin && <span>{formData.linkedin}</span>}
              {formData.linkedin && formData.github && <span>•</span>}
              {formData.github && <span>{formData.github}</span>}
              {formData.github && formData.city && <span>•</span>}
              {formData.city && <span>{formData.city}</span>}
            </div>
          </div>

          {/* Skills */}
          {formData.skills.length > 0 && (
            <div>
              <div className="border-b border-black/80 py-1 mb-2">
                <h2 className="text-center font-bold text-black" style={{ fontSize: "13px" }}>
                  Skills
                </h2>
              </div>
              <p className="text-xs text-center leading-relaxed" style={{ fontSize: "11px" }}>
                {formData.skills.join(" · ")}
              </p>
            </div>
          )}

          {/* Experience */}
          {formData.experiences.length > 0 && (
            <div>
              <div className="border-b border-black/80 py-1 mb-2">
                <h2 className="text-center font-bold text-black" style={{ fontSize: "13px" }}>
                  Experience
                </h2>
              </div>
              <div className="space-y-2">
                {formData.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold" style={{ fontSize: "12px" }}>
                        {exp.company || "Company Name"}
                      </p>
                      <p className="text-xs" style={{ fontSize: "11px" }}>
                        {exp.location}
                      </p>
                    </div>
                    <div className="flex justify-between mb-1">
                      <p className="text-xs" style={{ fontSize: "11px" }}>
                        {exp.role || "Job Title"}
                      </p>
                      <p className="text-xs" style={{ fontSize: "11px" }}>
                        {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : "MM/YYYY - MM/YYYY"}
                      </p>
                    </div>
                    <ul className="list-disc ml-4 space-y-[2px]">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="text-xs leading-[1.2] tracking-tight" style={{ fontSize: "10.5px" }}>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData.education.length > 0 && (
            <div className="pt-3">
              <div className="border-b border-black/80 py-1 mb-1">
                <h2 className="text-center font-bold text-black" style={{ fontSize: "13px" }}>
                  Education
                </h2>
              </div>
              <div className="space-y-3">
                {formData.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold" style={{ fontSize: "12px" }}>
                        {edu.institution || "Institution Name"}
                      </p>
                      <p className="text-xs" style={{ fontSize: "11px" }}>
                        {edu.location}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs" style={{ fontSize: "11px" }}>
                        {edu.degree || "Degree Name"}
                      </p>
                      <p className="text-xs" style={{ fontSize: "11px" }}>
                        {edu.period || "YYYY - YYYY"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
