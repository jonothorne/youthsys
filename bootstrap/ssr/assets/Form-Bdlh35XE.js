import { ref, computed, resolveComponent, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head } from "@inertiajs/vue3";
import * as Icons from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Form",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      guardian: {
        first_name: "",
        last_name: "",
        email: "",
        primary_phone: "",
        secondary_phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        postcode: "",
        relationship: "Parent/Guardian"
      },
      young_person: {
        first_name: "",
        last_name: "",
        preferred_name: "",
        date_of_birth: "",
        gender: "",
        school_year: "",
        school_name: "",
        allergies: "",
        medications: "",
        medical_notes: "",
        dietary_requirements: ""
      },
      consents: {
        general_attendance: false,
        offsite_events: false,
        media_consent: false,
        medical_treatment: false,
        transport: false,
        signature_name: ""
      }
    });
    const steps = [
      { id: 1, title: "Parent / Guardian", icon: "User" },
      { id: 2, title: "Young person", icon: "HeartHandshake" },
      { id: 3, title: "Consents", icon: "ShieldCheck" }
    ];
    const currentStep = ref(0);
    const isLastStep = computed(() => currentStep.value === steps.length - 1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_center = resolveComponent("center");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Join Alive Youth" }, null, _parent));
      _push(`<div class="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white py-12" data-v-40c9e6a4><div class="mx-auto max-w-5xl space-y-8 px-4" data-v-40c9e6a4><div class="text-center" data-v-40c9e6a4>`);
      _push(ssrRenderComponent(_component_center, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/images/logo.png" alt="Alive Youth" width="350px" data-v-40c9e6a4${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/images/logo.png",
                alt: "Alive Youth",
                width: "350px"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="mt-2 text-4xl font-semibold text-slate-900" data-v-40c9e6a4>Register your young person</h1><p class="mt-3 text-base text-slate-600" data-v-40c9e6a4>We use this information to keep young people safe and keep you updated.</p></div><div class="panel p-0" data-v-40c9e6a4><div class="flex flex-col gap-4 border-b border-border bg-white/80 p-6 sm:flex-row sm:items-center" data-v-40c9e6a4><div class="flex flex-1 flex-wrap items-center gap-4" data-v-40c9e6a4><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<div class="flex items-center gap-3" data-v-40c9e6a4><div class="${ssrRenderClass([index <= currentStep.value ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-200 text-slate-400", "flex h-10 w-10 items-center justify-center rounded-full border font-semibold"])}" data-v-40c9e6a4>${ssrInterpolate(step.id)}</div><div data-v-40c9e6a4><p class="text-xs uppercase tracking-wide text-slate-500" data-v-40c9e6a4>Step ${ssrInterpolate(step.id)}</p><p class="text-sm font-semibold text-slate-900" data-v-40c9e6a4>${ssrInterpolate(step.title)}</p></div>`);
        if (index !== steps.length - 1) {
          _push(ssrRenderComponent(Icons.ChevronRight, { class: "hidden h-4 w-4 text-slate-300 sm:block" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="flex items-center gap-4 text-xs text-slate-500" data-v-40c9e6a4><span data-v-40c9e6a4>${ssrInterpolate(currentStep.value + 1)} / ${ssrInterpolate(steps.length)}</span></div></div><form class="space-y-6 p-6" data-v-40c9e6a4>`);
      if (currentStep.value === 0) {
        _push(`<div class="grid gap-4 md:grid-cols-2" data-v-40c9e6a4><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>First name</label><input${ssrRenderAttr("value", unref(form).guardian.first_name)} class="form-input" data-v-40c9e6a4>`);
        if (unref(form).errors["guardian.first_name"]) {
          _push(`<p class="form-error" data-v-40c9e6a4>${ssrInterpolate(unref(form).errors["guardian.first_name"])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Last name</label><input${ssrRenderAttr("value", unref(form).guardian.last_name)} class="form-input" data-v-40c9e6a4>`);
        if (unref(form).errors["guardian.last_name"]) {
          _push(`<p class="form-error" data-v-40c9e6a4>${ssrInterpolate(unref(form).errors["guardian.last_name"])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Email</label><input${ssrRenderAttr("value", unref(form).guardian.email)} type="email" class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Primary phone</label><input${ssrRenderAttr("value", unref(form).guardian.primary_phone)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Secondary phone</label><input${ssrRenderAttr("value", unref(form).guardian.secondary_phone)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Relationship</label><input${ssrRenderAttr("value", unref(form).guardian.relationship)} class="form-input" data-v-40c9e6a4></div><div class="md:col-span-2 grid gap-4 md:grid-cols-2" data-v-40c9e6a4><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Address line 1</label><input${ssrRenderAttr("value", unref(form).guardian.address_line1)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Address line 2</label><input${ssrRenderAttr("value", unref(form).guardian.address_line2)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Town/City</label><input${ssrRenderAttr("value", unref(form).guardian.city)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Postcode</label><input${ssrRenderAttr("value", unref(form).guardian.postcode)} class="form-input" data-v-40c9e6a4></div></div></div>`);
      } else if (currentStep.value === 1) {
        _push(`<div class="grid gap-4 md:grid-cols-2" data-v-40c9e6a4><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>First name</label><input${ssrRenderAttr("value", unref(form).young_person.first_name)} class="form-input" data-v-40c9e6a4>`);
        if (unref(form).errors["young_person.first_name"]) {
          _push(`<p class="form-error" data-v-40c9e6a4>${ssrInterpolate(unref(form).errors["young_person.first_name"])}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Last name</label><input${ssrRenderAttr("value", unref(form).young_person.last_name)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Preferred name</label><input${ssrRenderAttr("value", unref(form).young_person.preferred_name)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Date of birth</label><input${ssrRenderAttr("value", unref(form).young_person.date_of_birth)} type="date" class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Gender</label><select class="form-input" data-v-40c9e6a4><option value="" data-v-40c9e6a4${ssrIncludeBooleanAttr(Array.isArray(unref(form).young_person.gender) ? ssrLooseContain(unref(form).young_person.gender, "") : ssrLooseEqual(unref(form).young_person.gender, "")) ? " selected" : ""}>Select</option><option value="Female" data-v-40c9e6a4${ssrIncludeBooleanAttr(Array.isArray(unref(form).young_person.gender) ? ssrLooseContain(unref(form).young_person.gender, "Female") : ssrLooseEqual(unref(form).young_person.gender, "Female")) ? " selected" : ""}>Female</option><option value="Male" data-v-40c9e6a4${ssrIncludeBooleanAttr(Array.isArray(unref(form).young_person.gender) ? ssrLooseContain(unref(form).young_person.gender, "Male") : ssrLooseEqual(unref(form).young_person.gender, "Male")) ? " selected" : ""}>Male</option><option value="Other" data-v-40c9e6a4${ssrIncludeBooleanAttr(Array.isArray(unref(form).young_person.gender) ? ssrLooseContain(unref(form).young_person.gender, "Other") : ssrLooseEqual(unref(form).young_person.gender, "Other")) ? " selected" : ""}>Other / Prefer not to say</option></select></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>School year</label><input${ssrRenderAttr("value", unref(form).young_person.school_year)} class="form-input" data-v-40c9e6a4></div><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>School name</label><input${ssrRenderAttr("value", unref(form).young_person.school_name)} class="form-input" data-v-40c9e6a4></div><div class="md:col-span-2" data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Allergies</label><textarea class="form-input" rows="2" data-v-40c9e6a4>${ssrInterpolate(unref(form).young_person.allergies)}</textarea></div><div class="md:col-span-2" data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Medications</label><textarea class="form-input" rows="2" data-v-40c9e6a4>${ssrInterpolate(unref(form).young_person.medications)}</textarea></div><div class="md:col-span-2" data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Medical / additional notes</label><textarea class="form-input" rows="3" data-v-40c9e6a4>${ssrInterpolate(unref(form).young_person.medical_notes)}</textarea></div><div class="md:col-span-2" data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Dietary requirements</label><textarea class="form-input" rows="2" data-v-40c9e6a4>${ssrInterpolate(unref(form).young_person.dietary_requirements)}</textarea></div></div>`);
      } else {
        _push(`<div class="space-y-4" data-v-40c9e6a4><div class="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600" data-v-40c9e6a4><p class="text-sm font-semibold text-slate-900" data-v-40c9e6a4>Permissions</p><p data-v-40c9e6a4>Please confirm each consent so we can safely include your young person.</p></div><label class="flex items-start gap-3 text-sm text-slate-700" data-v-40c9e6a4><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consents.general_attendance) ? ssrLooseContain(unref(form).consents.general_attendance, null) : unref(form).consents.general_attendance) ? " checked" : ""} type="checkbox" class="mt-1" data-v-40c9e6a4><span data-v-40c9e6a4>Regular Alive Youth sessions (required)</span></label><label class="flex items-start gap-3 text-sm text-slate-700" data-v-40c9e6a4><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consents.offsite_events) ? ssrLooseContain(unref(form).consents.offsite_events, null) : unref(form).consents.offsite_events) ? " checked" : ""} type="checkbox" class="mt-1" data-v-40c9e6a4><span data-v-40c9e6a4>Offsite events with Alive Youth leaders</span></label><label class="flex items-start gap-3 text-sm text-slate-700" data-v-40c9e6a4><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consents.media_consent) ? ssrLooseContain(unref(form).consents.media_consent, null) : unref(form).consents.media_consent) ? " checked" : ""} type="checkbox" class="mt-1" data-v-40c9e6a4><span data-v-40c9e6a4>Use of photos/videos for church communications</span></label><label class="flex items-start gap-3 text-sm text-slate-700" data-v-40c9e6a4><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consents.medical_treatment) ? ssrLooseContain(unref(form).consents.medical_treatment, null) : unref(form).consents.medical_treatment) ? " checked" : ""} type="checkbox" class="mt-1" data-v-40c9e6a4><span data-v-40c9e6a4>Leaders can seek emergency medical help if required</span></label><label class="flex items-start gap-3 text-sm text-slate-700" data-v-40c9e6a4><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consents.transport) ? ssrLooseContain(unref(form).consents.transport, null) : unref(form).consents.transport) ? " checked" : ""} type="checkbox" class="mt-1" data-v-40c9e6a4><span data-v-40c9e6a4>Travel in vehicles organised by Alive Youth</span></label><div data-v-40c9e6a4><label class="form-label" data-v-40c9e6a4>Digital signature (your full name)</label><input${ssrRenderAttr("value", unref(form).consents.signature_name)} class="form-input" data-v-40c9e6a4></div></div>`);
      }
      _push(`<div class="flex items-center justify-between border-t border-border pt-4" data-v-40c9e6a4><button type="button" class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold"${ssrIncludeBooleanAttr(currentStep.value === 0) ? " disabled" : ""} data-v-40c9e6a4> Back </button><button type="submit" class="rounded-2xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white" data-v-40c9e6a4>${ssrInterpolate(isLastStep.value ? "Submit registration" : "Continue")}</button></div></form></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Enrolment/Form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40c9e6a4"]]);
export {
  Form as default
};
