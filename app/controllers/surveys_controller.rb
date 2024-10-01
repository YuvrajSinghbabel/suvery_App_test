class SurveysController < ApplicationController  
  protect_from_forgery
  def new
    @survey = Survey.new
  end

  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      redirect_to edit_survey_path(@survey), notice: 'Survey was successfully created.'
    else
      render :new
    end
  end

  def edit    
    @survey = Survey.find(params[:id])
    @components = @survey.components
  end

  def update
    survey = Survey.find(params[:id])
      params[:components].each do |component_data|
        component = survey.components.find_or_initialize_by(id: component_data[:id])
        component.update(
          component_type: component_data[:type],
          content: component_data[:content],
          x_coordinate: component_data[:x],
          y_coordinate: component_data[:y]
        )
      end
    redirect_to survey_path(survey), notice: 'Survey updated successfully.'
  end

  def show
    @survey = Survey.find(params[:id])
    
    respond_to do |format|
      format.html # renders show.html.erb by default
      format.json { render json: @survey, include: :components }
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:name, :description)
  end

end
