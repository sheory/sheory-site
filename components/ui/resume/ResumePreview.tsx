"use client"

import { Card } from "@/components/ui/card"
import type { ResumeFormData } from "@/app/curriculo/page"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ResumePreviewProps {
  formData: ResumeFormData
  atsData?: any
}

export function ResumePreview({ formData, atsData }: ResumePreviewProps) {
  const highlightText = (text: string) => {
    if (!atsData?.highlights?.length) return text
    let highlighted = text
    atsData.highlights.forEach(({ text: keyword, suggestion, severity }: any) => {
      const color =
        severity === "error"
          ? "bg-red-200/60 border-red-400"
          : "bg-yellow-200/50 border-yellow-400"
      const regex = new RegExp(`(${keyword})`, "gi")
      highlighted = highlighted.replace(
        regex,
        `<span class="highlight ${color}" data-tooltip="${suggestion}">$1</span>`
      )
    })
    return highlighted
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="lg:sticky lg:top-20 h-fit">
        <Card
          id="resume-preview"
          className="bg-white text-black min-h-[1000px] relative"
          style={{
            padding: "2rem 2.5rem",
            fontFamily: "'PT Sans', Arial, Helvetica, sans-serif",
            color: "rgb(51, 51, 51)",
          }}
        >
          <style jsx global>{`
            .highlight {
              border-radius: 3px;
              border: 1px solid transparent;
              padding: 0 2px;
              cursor: help;
            }
          `}</style>

          <div className="space-y-2">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-[20px] font-bold text-center leading-[28px] text-black uppercase">
                {formData.fullName || "NOME SOBRENOME"}
              </h1>
              <p className="text-[14px] text-[#6f6f6f] leading-[16px] mb-1" style={{ fontSize: "13px"}}>
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
                <p
                  className="text-xs text-center leading-relaxed"
                  style={{ fontSize: "11px" }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(formData.skills.join(" · ")),
                  }}
                />
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
                        <p
                          className="font-semibold"
                          style={{ fontSize: "12px" }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(exp.company || "Company Name"),
                          }}
                        />
                        <p className="text-xs" style={{ fontSize: "11px" }}>
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex justify-between mb-1">
                        <p
                          className="text-xs"
                          style={{ fontSize: "11px" }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(exp.role || "Job Title"),
                          }}
                        />
                        <p className="text-xs" style={{ fontSize: "11px" }}>
                          {exp.startDate && exp.endDate
                            ? `${exp.startDate} - ${exp.endDate}`
                            : "MM/YYYY - MM/YYYY"}
                        </p>
                      </div>
                      <ul className="list-disc ml-4 space-y-[2px]">
                        {exp.responsibilities.map((r, i) => (
                          <li
                            key={i}
                            className="text-xs leading-[1.2] tracking-tight"
                            style={{ fontSize: "10.5px" }}
                            dangerouslySetInnerHTML={{
                              __html: highlightText(r),
                            }}
                          />
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
                        <p
                          className="font-semibold"
                          style={{ fontSize: "12px" }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(edu.institution || "Institution Name"),
                          }}
                        />
                        <p className="text-xs" style={{ fontSize: "11px" }}>
                          {edu.location}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p
                          className="text-xs"
                          style={{ fontSize: "11px" }}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(edu.degree || "Degree Name"),
                          }}
                        />
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
    </TooltipProvider>
  )
}
